﻿// <auto-generated />
using ContentsLimit.Dal;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace ContentsLimit.Migrations
{
    [DbContext(typeof(DalService))]
    [Migration("20190922223822_initial")]
    partial class initial
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.6-servicing-10079");

            modelBuilder.Entity("ContentsLimit.Pocos.ContentLimitItemPoco", b =>
                {
                    b.Property<string>("Guid")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Category");

                    b.Property<string>("Name");

                    b.Property<decimal>("Value");

                    b.HasKey("Guid");

                    b.ToTable("ContentLimitItems");
                });
#pragma warning restore 612, 618
        }
    }
}
