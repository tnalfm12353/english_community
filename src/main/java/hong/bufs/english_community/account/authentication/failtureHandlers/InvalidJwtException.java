package hong.bufs.english_community.account.authentication.failtureHandlers;

public class InvalidJwtException extends RuntimeException{

    /**
     *
     */
    private static final long serialVersionUID = 1L;

    public InvalidJwtException(String msg) {
        super(msg);
    }
    
}
