using System.Text.Json;
using DotNetTrainingProject.Models.Responses;

namespace DotNetTrainingProject.Middlewares
{
    public class AuthorizeMiddleware
    {
        private readonly RequestDelegate _next;
        public AuthorizeMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            // Gọi tiếp middleware tiếp theo trong pipeline
            await _next(context);

            // Can thiệp vào response sau khi các middleware trước đã xử lý
            if (context.Response.StatusCode == StatusCodes.Status403Forbidden)
            {
                var response = new Response { Status = "Error", Message = "Only Admin can use this feature!" };
                var options = new JsonSerializerOptions
                {
                    PropertyNamingPolicy = JsonNamingPolicy.CamelCase, // Sử dụng camelCase
                    WriteIndented = true // Tùy chọn: Định dạng đẹp
                };
                var responseJson = JsonSerializer.Serialize(response, options);
                context.Response.ContentType = "application/json";
                await context.Response.WriteAsync(responseJson);
            }
        }

    }
}
