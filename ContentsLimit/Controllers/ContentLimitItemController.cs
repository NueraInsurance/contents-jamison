using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using ContentsLimit.Pocos;
using ContentsLimit.Dal;
using System.Linq;

namespace ContentsLimit.Controllers
{

    [Route("api/contentLimitItems")]
	[ApiController]
	public class ContentLimitItemController : ControllerBase
    {

        // -------------------------------------------
        /// <summary>
        /// Get all items
        /// </summary>
        [HttpGet]
        public ActionResult<IEnumerable<ContentLimitItemPoco>> Get()
        {
            using (var dal = new DalService())
            {
                return dal.ContentLimitItems.ToArray();
            }
        }


        // -------------------------------------------
        /// <summary>
        /// Post a new item to the database
        /// </summary>
        [HttpPost]
        public object Post([FromBody] ContentLimitItemPoco poco)
        {
            var model = poco.ToModel();
            if (!model.IsValid)
            {
                return new
                {
                    isSuccess = false,
                    messages = model.ValidationResults()
                };
            }

            using (var dal = new DalService())
            {
                poco = model
                    .CreateGuid()
                    .ToPoco();
                dal.Add(poco);
                dal.SaveChanges();

                return new { isSuccess = true, record = poco };
            }
        }


        // -------------------------------------------
        /// <summary>
        /// Put (update) an existing item in the database
        /// </summary>
        [HttpPut]
        public object Put([FromBody] ContentLimitItemPoco poco)
        {
            var model = poco.ToModel();
            if (!model.IsValid)
            {
                return new
                {
                    isSuccess = false,
                    messages = model.ValidationResults()
                };
            }

            using (var dal = new DalService())
            {
                dal.Update(poco);
                dal.SaveChanges();

                return new { isSuccess = true, record = poco };
            }
        }


        // -------------------------------------------
        /// <summary>
        /// Delete an existing item from the database.
        /// </summary>
        [HttpDelete("{guid}")]
        public object Delete(string guid)
        {
            using (var dal = new DalService())
            {
                var existingItem = dal.ContentLimitItems
                    .FirstOrDefault(r => r.Guid.Equals(guid, StringComparison.OrdinalIgnoreCase));

                if (existingItem == null)
                {
                    return new
                    {
                        isSuccess = false,
                        messages = new string[] { "Could not find item to delete" }
                    };
                }

                dal.Remove(existingItem);
                dal.SaveChanges();

                return new { isSuccess = true };
            }
        }

    }
}
