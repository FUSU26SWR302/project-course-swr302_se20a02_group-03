namespace ProSport.Application.DTOs;

public class ApiResponseDto<T>
{
    public int StatusCode { get; set; }
    public string Message { get; set; } = null!;
    public T? Data { get; set; }

    public ApiResponseDto(int statusCode, string message, T? data = default)
    {
        StatusCode = statusCode;
        Message = message;
        Data = data;
    }
}
