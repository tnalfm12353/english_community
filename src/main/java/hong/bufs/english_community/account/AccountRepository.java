package hong.bufs.english_community.account;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

@Transactional(readOnly = true)
public interface AccountRepository extends JpaRepository<Account,Long>{

    boolean existsByUsername(String isExist);
    
    boolean existsByNickname(String isExist);

	Account findByUsername(String username);
    
}
