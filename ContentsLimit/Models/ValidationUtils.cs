using System;
using System.Collections.Generic;

namespace ContentsLimit.Models
{
    public static class ValidationUtils
    {
        public static void RequireValue(this string value, string field, List<string> failures)
        {
            if (string.IsNullOrEmpty(value))
            {
                failures.Add($"{field}: Value is required");
            }
        }


        public static void RequireValue<T>(this T value, T emptyValue, string field, List<string> failures)
            where T : struct
        {
            if (value.Equals(emptyValue))
            {
                failures.Add($"{field}: Value is required");
            }
        }


        public static void IsGreaterThanOrEqualTo(this decimal value, decimal greaterThanNumber, string field, List<string> failures)
        {
            if (value <= greaterThanNumber)
            {
                failures.Add($"{field}: Value must be greater than or equal to {greaterThanNumber}");
            }
        }
    }
}
