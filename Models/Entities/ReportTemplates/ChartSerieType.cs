﻿namespace LightMethods.Survey.Models.Entities
{
    public class ChartSerieType: Entity, IEnumEntity
    {
        public int Order { get; set; }

        public string Name { get; set; }

        public string SystemName { get; set; }

        public override string ToString()
        {
            return Name;
        }
    }
}
