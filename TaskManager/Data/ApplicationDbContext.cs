using TaskManager.Models;
using IdentityServer4.EntityFramework.Options;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TaskManager.Data
{
    public class ApplicationDbContext : ApiAuthorizationDbContext<ApplicationUser>
    {
        //
        // Summary:
        //     Gets or sets the Microsoft.EntityFrameworkCore.DbSet`1.
        public DbSet<TodoItem> Todos { get; set; }

        public ApplicationDbContext(
            DbContextOptions options,
            IOptions<OperationalStoreOptions> operationalStoreOptions) : base(options, operationalStoreOptions)
        {
        }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<TodoItem>()
                .HasOne(b => b.ApplicationUser)
                    .WithMany(u => u.Todos);
            builder.Entity<TodoItem>()
            .Property(f => f.Id)
            .ValueGeneratedOnAdd();
        }
    }
}
