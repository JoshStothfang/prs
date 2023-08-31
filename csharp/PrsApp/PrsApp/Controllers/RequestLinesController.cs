using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PrsApp.Data;
using PrsApp.Models;

namespace PrsApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RequestLinesController : ControllerBase
    {
        private readonly PrsDbContext _context;

        public RequestLinesController(PrsDbContext context)
        {
            _context = context;
        }

        // GET: api/RequestLines
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RequestLine>>> GetRequestLines()
        {
          if (_context.RequestLines == null)
          {
              return NotFound();
          }
            return await _context.RequestLines.ToListAsync();
        }

        // GET: api/RequestLines/5
        [HttpGet("{id}")]
        public async Task<ActionResult<RequestLine>> GetRequestLine(int id)
        {
          if (_context.RequestLines == null)
          {
              return NotFound();
          }
            var requestLine = await _context.RequestLines.FindAsync(id);

            if (requestLine == null)
            {
                return NotFound();
            }

            return requestLine;
        }

        // PUT: api/RequestLines/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRequestLine(int id, RequestLine requestLine)
        {
            if (id != requestLine.Id)
            {
                return BadRequest();
            }

            _context.Entry(requestLine).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();

                await RecalculateRequestTotal(requestLine.RequestId);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RequestLineExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/RequestLines
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<RequestLine>> PostRequestLine(RequestLine requestLine)
        {
          if (_context.RequestLines == null)
          {
              return Problem("Entity set 'PrsDbContext.RequestLines'  is null.");
          }
            _context.RequestLines.Add(requestLine);
            await _context.SaveChangesAsync();

            await RecalculateRequestTotal(requestLine.RequestId);

            return CreatedAtAction("GetRequestLine", new { id = requestLine.Id }, requestLine);
        }

        // DELETE: api/RequestLines/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRequestLine(int id)
        {
            if (_context.RequestLines == null)
            {
                return NotFound();
            }
            var requestLine = await _context.RequestLines.FindAsync(id);
            if (requestLine == null)
            {
                return NotFound();
            }

            var requestId = requestLine.RequestId;

            _context.RequestLines.Remove(requestLine);
            await _context.SaveChangesAsync();

            await RecalculateRequestTotal(requestId);

            return NoContent();
        }

        private bool RequestLineExists(int id)
        {
            return (_context.RequestLines?.Any(e => e.Id == id)).GetValueOrDefault();
        }

        private async Task RecalculateRequestTotal(int requestId)
        {
            var total = (from rl in _context.RequestLines
                         join p in _context.Products
                             on rl.ProductId equals p.Id
                         where rl.RequestId == requestId
                         select p.Price * rl.Quantity)
                        .Sum();

            var request = await _context.Requests.FindAsync(requestId);

            request!.Total = total;

            await _context.SaveChangesAsync();
        }
    }
}
