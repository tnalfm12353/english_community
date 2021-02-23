package hong.bufs.english_community.account;

import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;

import hong.bufs.english_community.domain.Account;
import lombok.Getter;

@Getter
public class AccountContext extends User {

    private static final long serialVersionUID = -183191712992581793L;
    private Account account;

    private AccountContext(Account account,String username, String password, Collection<? extends GrantedAuthority> authorities) {
        super(username, password, authorities);   
        this.account = account;
    }

    //jwt
    public AccountContext(String username, String password, String role){
        super(username,password,setAuthorities(role));
    }

    public static AccountContext fromAccountEntity(Account account){
        return new AccountContext(account, account.getUsername(), account.getPassword(), setAuthorities(account.getPosition()));
    }

    private static List<SimpleGrantedAuthority> setAuthorities(PositionType position){
        return Arrays.asList(position).stream().map(type -> new SimpleGrantedAuthority(type.getPositionType())).collect(Collectors.toList());
    }

    private static List<SimpleGrantedAuthority> setAuthorities(String position){
        return setAuthorities(PositionType.getRoleByPosition(position));
    }
}
