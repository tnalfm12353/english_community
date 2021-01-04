package hong.bufs.english_community.account;

import lombok.Getter;

import java.util.Arrays;
import java.util.NoSuchElementException;
@Getter
public enum PositionType {
    
    ANONYMOUS("ROLE_USER"),
    GRADE_1("ROLE_USER"),
    GRADE_2("ROLE_USER"),
    GRADE_3("ROLE_USER"),
    GRADE_4("ROLE_USER"),
    GRADUATION("ROLE_USER"),
    PROFESSOR("ROLE_PROFESSOR");

    private String positionType;

    private PositionType(String position) {
        this.positionType = position;
    }

	public static PositionType getRoleByPosition(String position) {
		return Arrays.stream(PositionType.values()).filter(type -> type.isCorrectPosition(position)).findFirst().orElseThrow(() -> new NoSuchElementException("검색된 권한이 없습니다."));
	}

    private boolean isCorrectPosition(String position) {
        return position.equalsIgnoreCase(this.positionType);
    }
}
