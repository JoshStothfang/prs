package capstone.java.prs.models.user;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Integer> {

	Optional<User> findByUsernameAndPassword(String username, String password);
}
