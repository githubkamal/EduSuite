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
            public DbSet<Department> Departments => Set<Department>();
            public DbSet<Role> Roles => Set<Role>();
            public DbSet<Batch> Batchs => Set<Batch>();
            public DbSet<Alumni> Alumnis { get; set; }

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

                modelBuilder.Entity<Alumni>(entity =>
                {
                    entity.ToTable("Alumnis");

                    entity.HasKey(e => e.AlumniId);

                    entity.Property(e => e.CreatedOn)
                          .HasDefaultValueSql("CURRENT_TIMESTAMP");

                    entity.Property(e => e.ModifiedOn)
                          .HasDefaultValueSql("CURRENT_TIMESTAMP")
                          .ValueGeneratedOnAddOrUpdate();

                    entity.HasIndex(e => e.RegNo);
                    entity.HasIndex(e => e.MccEmail);
                    entity.HasIndex(e => e.PersonalEmail);

                    entity.HasOne(e => e.Department)
                          .WithMany()
                          .HasForeignKey(e => e.DepartmentId)
                          .OnDelete(DeleteBehavior.Restrict);

                    entity.HasOne(e => e.Batch)
                          .WithMany()
                          .HasForeignKey(e => e.BatchId)
                          .OnDelete(DeleteBehavior.Restrict);
                });
            }

            // Automatically set CreatedOn and ModifiedOn
            public override int SaveChanges()
            {
                var entries = ChangeTracker.Entries<BaseEntity>();
                var utcNow = DateTime.UtcNow;

                foreach (var entry in entries)
                {
                    if (entry.State == EntityState.Added)
                    {
                        entry.Entity.CreatedOn = utcNow;
                        entry.Entity.ModifiedOn = utcNow;
                    }
                    else if (entry.State == EntityState.Modified)
                    {
                        entry.Entity.ModifiedOn = utcNow;
                    }
                }

                return base.SaveChanges();
            }
        }
    }

}
