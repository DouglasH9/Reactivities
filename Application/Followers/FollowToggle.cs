using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using MediatR;

namespace Application.Followers
{
    public class FollowToggle
    {
            public class Command : IRequest<Result<Unit>>
            {
                public string TargetUsername { get; set; }
            }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            public Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                throw new NotImplementedException();
            }
        }
    }
}