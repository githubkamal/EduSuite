using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EduSuite.Data.Entities
{
    using System;

    public class Alumni
    {
        public int AlumniId { get; set; }
        public int DepartmentId { get; set; }
        public int BatchId { get; set; }

        public string? Name { get; set; }
        public string? RegNo { get; set; }
        public string? MccEmail { get; set; }
        public string? NameFromForm { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string? PersonalEmail { get; set; }
        public string? ReligionCommunity { get; set; }
        public string? Nationality { get; set; }
        public string? AadharNo { get; set; }
        public string? BloodGroup { get; set; }
        public string? MobileNumber { get; set; }
        public string? SslcSchool { get; set; }
        public string? SslcMarks { get; set; }
        public string? SslcPercentage { get; set; }
        public string? SslcAchievements { get; set; }
        public string? ModeOfConveyance { get; set; }
        public string? HallNameRoom { get; set; }
        public string? LocalGuardianName { get; set; }
        public string? LocalGuardianPhone { get; set; }
        public string? Hobbies { get; set; }
        public string? ExtraCurricularInterests { get; set; }
        public string? SocialFacebook { get; set; }
        public string? SocialInstagram { get; set; }
        public string? SocialTwitter { get; set; }
        public string? LanguagesKnown { get; set; }
        public string? InterestedInPartTimeJob { get; set; }
        public string? SpecialHealthComplaint { get; set; }
        public string? PhysicalDisability { get; set; }
        public string? EmergencyPhone { get; set; }
        public DateTime? DateOfSignature { get; set; }
        public string? ParentGuardianSignature { get; set; }

        public DateTime CreatedOn { get; set; }
        public DateTime ModifiedOn { get; set; }
        public int? CreatedBy { get; set; }
        public int? ModifiedBy { get; set; }

        // Navigation Properties
        public Department Department { get; set; }
        public Batch Batch { get; set; }
    }

}
