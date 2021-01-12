package hong.bufs.english_community.account;

import javax.validation.Valid;

import org.modelmapper.ModelMapper;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import hong.bufs.english_community.account.form.SignUpForm;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AccountService implements UserDetailsService {

    private final AccountRepository accountRepository;
    private final PasswordEncoder passwordEncoder;
    private final ModelMapper modelMapper;

    public Account processNewAccount(@Valid SignUpForm SignUpForm) {
        Account newAccount = saveNewAccount(SignUpForm);
        return newAccount;
    }

    private Account saveNewAccount(@Valid SignUpForm SignUpForm) {
        // spring security DelegataingPasswordEncoder() 때문에 "{bcrypt}"는 password의 식별자 역활함
        // https://pupupee9.tistory.com/100
        SignUpForm.setPassword(passwordEncoder.encode(SignUpForm.getPassword()));
        Account account = modelMapper.map(SignUpForm, Account.class);
        return accountRepository.save(account);
    }
    
    @Transactional(readOnly = true)
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Account account = accountRepository.findByUsername(username);
        
        if( account == null){
            throw new UsernameNotFoundException(username+"을 찾을 수 없음");
        }
        return AccountContext.fromAccountEntity(account);
    }

	public Account getUserAccount(AccountContext context) {
        AccountContext account = (AccountContext) loadUserByUsername(context.getUsername());
        return account.getAccount();
	}
    
    @Transactional(readOnly = true)
    public Account getAccountProfile(Long id) throws UsernameNotFoundException{
        Account account = accountRepository.findById(id).orElseThrow(()-> new UsernameNotFoundException("해당하는 유저를 찾을 수 없습니다."));
        return account;
    }

}
