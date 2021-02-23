package hong.bufs.english_community.account;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import hong.bufs.english_community.domain.Account;

@Transactional(readOnly = true)
public interface AccountRepository extends JpaRepository<Account, Long> {

    boolean existsByUsername(String isExist);

    boolean existsByNickname(String isExist);

    Account findByUsername(String username);

    Optional<Account> findById(Long id);
    
}
