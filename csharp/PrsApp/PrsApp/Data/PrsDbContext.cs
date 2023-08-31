using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PrsApp.Models;

namespace PrsApp.Data
{
    public class PrsDbContext : DbContext
    {
        public PrsDbContext (DbContextOptions<PrsDbContext> options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; } = default!;

        public DbSet<Vendor> Vendors { get; set; } = default!;

        public DbSet<Product> Products { get; set; } = default!;

        public DbSet<Request> Requests { get; set; } = default!;

        public DbSet<RequestLine> RequestLines { get; set; } = default!;
    }
}
