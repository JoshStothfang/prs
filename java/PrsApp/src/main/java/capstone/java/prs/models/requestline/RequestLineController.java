package capstone.java.prs.models.requestline;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
@RequestMapping("/api/requestlines")
public class RequestLineController {

	@Autowired
	private RequestLineRepository reqLineRepo;
	
	@GetMapping
	public ResponseEntity<Iterable<RequestLine>> getRequestLines() {
		
		Iterable<RequestLine> reqLines = reqLineRepo.findAll();
		return new ResponseEntity<Iterable<RequestLine>>(reqLines, HttpStatus.OK);
	}
	
	@GetMapping("{id}")
	public ResponseEntity<RequestLine> getRequestLine(@PathVariable int id) {
		
		if (id <= 0) {
			
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
		
		Optional<RequestLine> reqLine = reqLineRepo.findById(id);
		if (reqLine.isEmpty()) {
			
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		
		return new ResponseEntity<RequestLine>(reqLine.get(), HttpStatus.OK);
	}
	
	@PostMapping
	public ResponseEntity<RequestLine> postRequestLine(@RequestBody RequestLine reqLine) {
		
		if (reqLine.getId() != 0) {
			
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
		
		reqLineRepo.save(reqLine);
		return new ResponseEntity<RequestLine>(reqLine, HttpStatus.CREATED);	
	}
	
	@SuppressWarnings("rawtypes")
	@PutMapping("{id}")
	public ResponseEntity putRequestLine(@PathVariable int id, @RequestBody RequestLine reqLine) {
		
		if (reqLine.getId() != id) {
			
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
		
		reqLineRepo.save(reqLine);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@SuppressWarnings("rawtypes")
	@DeleteMapping("{id}")
	public ResponseEntity deleteRequestLine(@PathVariable int id) {
		
		if (id <= 0) {
			
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
		
		reqLineRepo.deleteById(id);
		return new ResponseEntity<>(HttpStatus.OK);
	}
}
