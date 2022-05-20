using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context,
            UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any() && !context.Activities.Any())
            {
                var users = new List<AppUser>
                {
                    new AppUser
                    {
                        DisplayName = "Bob",
                        UserName = "bob",
                        Email = "bob@test.com"
                    },
                    new AppUser
                    {
                        DisplayName = "Jane",
                        UserName = "jane",
                        Email = "jane@test.com"
                    },
                    new AppUser
                    {
                        DisplayName = "Tom",
                        UserName = "tom",
                        Email = "tom@test.com"
                    },
                };

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }

                var activities = new List<Activity>
                {
                    new Activity
                    {
                        Title = "The old Man and the Bee",
                        Date = DateTime.UtcNow.AddMonths(-2),
                        Description = "A story about an old man and his magical bee.",
                        Category = "fantasy",
                        City = "London",
                        Venue = "Pub",
                        Attendees = new List<ActivityAttendee>
                        {
                            new ActivityAttendee
                            {
                                AppUser = users[0],
                                IsHost = true
                            }
                        }
                    },
                    new Activity
                    {
                        Title = "A Moveable Beast",
                        Date = DateTime.UtcNow.AddMonths(-1),
                        Description = "A beastly tale of one man's struggle against nature.",
                        Category = "other",
                        City = "Paris",
                        Venue = "The Louvre",
                        Attendees = new List<ActivityAttendee>
                        {
                            new ActivityAttendee
                            {
                                AppUser = users[0],
                                IsHost = true
                            },
                            new ActivityAttendee
                            {
                                AppUser = users[1],
                                IsHost = false
                            },
                        }
                    },
                    new Activity
                    {
                        Title = "The Night Stand",
                        Date = DateTime.UtcNow.AddMonths(1),
                        Description = "A genre defying story about a night stand.",
                        Category = "other",
                        City = "London",
                        Venue = "England",
                        Attendees = new List<ActivityAttendee>
                        {
                            new ActivityAttendee
                            {
                                AppUser = users[2],
                                IsHost = true
                            },
                            new ActivityAttendee
                            {
                                AppUser = users[1],
                                IsHost = false
                            },
                        }
                    },
                    new Activity
                    {
                        Title = "The Starvation Games",
                        Date = DateTime.UtcNow.AddMonths(2),
                        Description = "Children fight to the death on a reality TV show to win food for their starving families.",
                        Category = "young-adult",
                        City = "London",
                        Venue = "Jamies Italian",
                        Attendees = new List<ActivityAttendee>
                        {
                            new ActivityAttendee
                            {
                                AppUser = users[0],
                                IsHost = true
                            },
                            new ActivityAttendee
                            {
                                AppUser = users[2],
                                IsHost = false
                            },
                        }
                    },
                    new Activity
                    {
                        Title = "A Fungus Among Us",
                        Date = DateTime.UtcNow.AddMonths(3),
                        Description = "Fungus!",
                        Category = "science-fiction",
                        City = "London",
                        Venue = "Pub",
                        Attendees = new List<ActivityAttendee>
                        {
                            new ActivityAttendee
                            {
                                AppUser = users[1],
                                IsHost = true                            
                            },
                            new ActivityAttendee
                            {
                                AppUser = users[0],
                                IsHost = false                            
                            },
                        }
                    },
                    new Activity
                    {
                        Title = "Stars Hope Eternal",
                        Date = DateTime.UtcNow.AddMonths(4),
                        Description = "An epic sci-fi adventure.",
                        Category = "science-fiction",
                        City = "London",
                        Venue = "British Museum",
                        Attendees = new List<ActivityAttendee>
                        {
                            new ActivityAttendee
                            {
                                AppUser = users[1],
                                IsHost = true                            
                            }
                        }
                    },
                    new Activity
                    {
                        Title = "The Lady of the Rings",
                        Date = DateTime.UtcNow.AddMonths(5),
                        Description = "A fashion oriented fantasy adventure.",
                        Category = "fantasy",
                        City = "London",
                        Venue = "Punch and Judy",
                        Attendees = new List<ActivityAttendee>
                        {
                            new ActivityAttendee
                            {
                                AppUser = users[0],
                                IsHost = true                            
                            },
                            new ActivityAttendee
                            {
                                AppUser = users[1],
                                IsHost = false                            
                            },
                        }
                    },
                    new Activity
                    {
                        Title = "The Wrong Stuff",
                        Date = DateTime.UtcNow.AddMonths(6),
                        Description = "It's a book.",
                        Category = "young-adult",
                        City = "London",
                        Venue = "O2 Arena",
                        Attendees = new List<ActivityAttendee>
                        {
                            new ActivityAttendee
                            {
                                AppUser = users[2],
                                IsHost = true                            
                            },
                            new ActivityAttendee
                            {
                                AppUser = users[1],
                                IsHost = false                            
                            },
                        }
                    },
                    new Activity
                    {
                        Title = "Punks",
                        Date = DateTime.UtcNow.AddMonths(7),
                        Description = "A punky adventure.",
                        Category = "other",
                        City = "Berlin",
                        Venue = "All",
                        Attendees = new List<ActivityAttendee>
                        {
                            new ActivityAttendee
                            {
                                AppUser = users[0],
                                IsHost = true                            
                            },
                            new ActivityAttendee
                            {
                                AppUser = users[2],
                                IsHost = false                            
                            },
                        }
                    },
                    new Activity
                    {
                        Title = "War and War",
                        Date = DateTime.UtcNow.AddMonths(8),
                        Description = "A book about war.",
                        Category = "other",
                        City = "London",
                        Venue = "Pub",
                        Attendees = new List<ActivityAttendee>
                        {
                            new ActivityAttendee
                            {
                                AppUser = users[2],
                                IsHost = true                            
                            },
                            new ActivityAttendee
                            {
                                AppUser = users[1],
                                IsHost = false                            
                            },
                        }
                    }
                };

                await context.Activities.AddRangeAsync(activities);
                await context.SaveChangesAsync();
            }
        }
    }
}
