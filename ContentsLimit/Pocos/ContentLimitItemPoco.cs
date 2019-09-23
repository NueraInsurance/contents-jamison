using System;
using System.ComponentModel.DataAnnotations;
using ContentsLimit.Models;
namespace ContentsLimit.Pocos
{

    // -------------------------------------------
    /// <summary>
    /// Poco object of a content limit item. Poco objects are the most basic
    /// form of an object used for transfering data between the client and
    /// server, and loading / saving to the database.
    /// </summary>
    public class ContentLimitItemPoco
    {
        [Key] public string Guid { get; set; }
        public string Name { get; set; }
        public decimal Value { get; set; }
        public string Category { get; set; }
    }

    public static class ContentLimitItemPocoExtensions
    {

        public static ContentLimitItem ToModel(this ContentLimitItemPoco poco)
        {
            return new ContentLimitItem(
                guid: string.IsNullOrEmpty(poco.Guid) ? Guid.Empty : new Guid(poco.Guid),
                name: poco.Name ?? string.Empty,
                value: poco.Value,
                category: poco.Category.ToContentLimitItemCategory());
        }

        public static ContentLimitItemPoco ToPoco(this ContentLimitItem model)
        {
            return new ContentLimitItemPoco
            {
                Guid = model.Guid == Guid.Empty ? null : model.Guid.ToString(),
                Name = model.Name,
                Value = model.Value,
                Category = model.Category.ToString()
            };
        }
    }
}
