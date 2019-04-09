﻿using LightMethods.Survey.Models.Entities;

namespace LightMethods.Survey.Models.DAL
{
    public class ReportsRepository : Repository<Report>
    {
        public ReportsRepository(UnitOfWork uow) : base(uow) { }
    }
}
