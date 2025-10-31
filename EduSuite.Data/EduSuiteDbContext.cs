using EduSuite.Data.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EduSuite.Data
{
    namespace EduSuite.Data
    {
        public class EduSuiteDbContext : DbContext
        {
            public EduSuiteDbContext(DbContextOptions<EduSuiteDbContext> options)
                : base(options) { }

            public DbSet<Login> Logins => Set<Login>();
            public DbSet<Staff> Staffs => Set<Staff>();
            public DbSet<Student> Students => Set<Student>();

            protected override void OnModelCreating(ModelBuilder modelBuilder)
            {
                base.OnModelCreating(modelBuilder);

                // Common rules
                modelBuilder.Entity<Login>()
                    .HasIndex(x => x.Email)
                    .IsUnique();

                // Relationships
                modelBuilder.Entity<Staff>()
                    .HasOne(s => s.Login)
                    .WithOne(l => l.Staff)
                    .HasForeignKey<Staff>(s => s.LoginId)
                    .OnDelete(DeleteBehavior.Cascade);

                modelBuilder.Entity<Student>()
                    .HasOne(s => s.Login)
                    .WithOne(l => l.Student)
                    .HasForeignKey<Student>(s => s.LoginId)
                    .OnDelete(DeleteBehavior.Cascade);
            }
        }
    }

}
