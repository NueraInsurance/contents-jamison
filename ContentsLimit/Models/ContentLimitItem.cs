using System;
using System.Collections.Generic;
using System.Linq;

namespace ContentsLimit.Models
{

    // -------------------------------------------
    /// <summary>
    /// Model object of a content limit item. Model objects define how
    /// we want our data to look when ready for validation, calculations,
    /// and saving to the database.
    /// </summary>
    public class ContentLimitItem
    {
        public ContentLimitItem(
            Guid guid,
            string name,
            decimal value,
            ContentLimitItemCategory category)
        {
            if (string.IsNullOrEmpty(name)) { throw new ArgumentException(nameof(name)); }

            Guid = guid;
            Name = name;
            Value = value;
            Category = category;
        }


        // Public methods
        public ContentLimitItem CreateGuid()
        {
            if (!this.Guid.Equals(Guid.Empty))
            {
                throw new InvalidOperationException("Cannot create a new unique identifier for an existing model");
            }
            this.Guid = new Guid();
            return this;
        }


        public string[] ValidationResults()
        {
            var failures = new List<string>();

            this.Name.RequireValue("Name", failures);
            this.Value.IsGreaterThanOrEqualTo(0, "Value", failures);
            this.Category.RequireValue(ContentLimitItemCategory.Empty, "Category", failures);

            return failures.ToArray();
        } 


        // Public properties
        public Guid Guid { get; private set; }
        public string Name { get; }
        public decimal Value { get; }
        public ContentLimitItemCategory Category { get; }

        public bool IsValid => !this.ValidationResults().Any();
    }


    public enum ContentLimitItemCategory
    {
        Empty = 0,

        Clothing,

        Electronics,

        Kitchen,

        Misc
    }


    public static class ContentLimitItemCategoryExtensions
    {
        public static ContentLimitItemCategory ToContentLimitItemCategory(this string s)
        {
            switch (s)
            {
                case "Clothing":
                    return ContentLimitItemCategory.Clothing;
                case "Electronics":
                    return ContentLimitItemCategory.Electronics;
                case "Kitchen":
                    return ContentLimitItemCategory.Kitchen;
                case "Misc":
                    return ContentLimitItemCategory.Misc;
                default:
                    return ContentLimitItemCategory.Empty;
            }
        }
    }
}
