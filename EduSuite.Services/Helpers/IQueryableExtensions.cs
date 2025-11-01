using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace EduSuite.Services.Helpers
{
    public static class IQueryableExtensions
    {
        public static IQueryable<T> OrderByDynamic<T>(this IQueryable<T> source, string propertyName, bool ascending)
        {
            var param = Expression.Parameter(typeof(T), "x");
            var property = Expression.Property(param, propertyName);
            var sort = Expression.Lambda(property, param);
            var method = ascending ? "OrderBy" : "OrderByDescending";
            var types = new Type[] { source.ElementType, property.Type };
            var mce = Expression.Call(typeof(Queryable), method, types, source.Expression, sort);
            return source.Provider.CreateQuery<T>(mce);
        }
    }
}
