namespace API.Extensions
{
    public static class DateTimeExtensions
    {
        public static int CalculateAge(this DateTime dob)
        {
            //var today = DateOnly.FromDateTime(DateTime.UtcNow);
            var today = DateTime.UtcNow;
            var age = today.Year - dob.Year;

            if (dob > today.AddYears(-age)) age--;

            return age;
        }
    }
}
