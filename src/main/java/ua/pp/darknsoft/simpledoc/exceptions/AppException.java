package ua.pp.darknsoft.simpledoc.exceptions;

public class AppException extends RuntimeException{
    public AppException(String msg) {
        super(msg);
    }

    public AppException(String format, Object ... params) {
        super(String.format(format, params));
    }

    public AppException(Throwable t) {
        super(t);
    }

    public AppException() {
        super();
    }

    public AppException(String message, Throwable cause) {
        super(message, cause);
    }

    public AppException(String format, Throwable t, Object ... params) {
        super(String.format(format, params), t);
    }
}
