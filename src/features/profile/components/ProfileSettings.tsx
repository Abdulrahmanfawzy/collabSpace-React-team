import { useState, useRef, useMemo, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  User,
  Mail,
  ChevronDown,
  HelpCircle,
  SquarePen,
  Check,
} from "lucide-react";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import avtar from "@/assets/images/profile-avtar.svg";
import { getProfile, updateProfile } from "@/services/profile.service";

const COUNTRIES = [
  { code: "+20", iso: "eg", name: "Egypt" },
  { code: "+966", iso: "sa", name: "Saudi Arabia" },
  { code: "+971", iso: "ae", name: "UAE" },
  { code: "+965", iso: "kw", name: "Kuwait" },
  { code: "+974", iso: "qa", name: "Qatar" },
  { code: "+962", iso: "jo", name: "Jordan" },
  { code: "+968", iso: "om", name: "Oman" },
  { code: "+973", iso: "bh", name: "Bahrain" },
  { code: "+961", iso: "lb", name: "Lebanon" },
  { code: "+964", iso: "iq", name: "Iraq" },
  { code: "+212", iso: "ma", name: "Morocco" },
  { code: "+216", iso: "tn", name: "Tunisia" },
  { code: "+213", iso: "dz", name: "Algeria" },
  { code: "+249", iso: "sd", name: "Sudan" },
  { code: "+1", iso: "us", name: "United States" },
  { code: "+44", iso: "gb", name: "United Kingdom" },
  { code: "+49", iso: "de", name: "Germany" },
  { code: "+33", iso: "fr", name: "France" },
  { code: "+90", iso: "tr", name: "Turkey" },
];

const CountryFlag = ({ iso, alt }: { iso: string; alt?: string }) => {
  const [hasError, setHasError] = useState(false);

  if (iso === "eg") {
    return (
      <svg
        className="size-5 rounded-full overflow-hidden shrink-0 border border-gray-200/80 shadow-2xs"
        viewBox="0 0 512 512"
      >
        <rect width="512" height="170.67" fill="#CE1126" />
        <rect y="170.67" width="512" height="170.67" fill="#FFFFFF" />
        <rect y="341.33" width="512" height="170.67" fill="#000000" />
        <path
          d="M256 220c-8 0-14 8-14 18 0 8 4 14 10 16v18h8v-18c6-2 10-8 10-16 0-10-6-18-14-18z"
          fill="#C09A3E"
        />
      </svg>
    );
  }

  if (hasError || !iso) {
    return (
      <span className="size-5 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-500 border border-gray-200 shrink-0">
        🌐
      </span>
    );
  }

  return (
    <img
      src={`https://flagcdn.com/w40/${iso.toLowerCase()}.png`}
      srcSet={`https://flagcdn.com/w80/${iso.toLowerCase()}.png 2x`}
      alt={alt || iso}
      onError={() => setHasError(true)}
      className="size-5 rounded-full object-cover border border-gray-200/80 shadow-2xs shrink-0"
    />
  );
};

const detectCountryFromPhone = (phone: string) => {
  if (!phone) return { code: "+20", iso: "eg", name: "Egypt" };
  const cleaned = phone.trim();
  const sorted = [...COUNTRIES].sort((a, b) => b.code.length - a.code.length);
  for (const c of sorted) {
    if (cleaned.startsWith(c.code) || cleaned.startsWith(c.code.replace("+", ""))) {
      return c;
    }
  }
  return { code: "", iso: "", name: "International" };
};

/* 1. Validation Schema */
const profileSettingsSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(6, "Please enter a valid phone number"),
  availability: z.string().min(2, "Status is required"),
  jobTitle: z.string().min(2, "Job title is required"),
  experienceYears: z.string().min(1, "Experience is required"),
  currentProject: z.string().min(2, "Project name is required"),
});

type ProfileSettingsFormData = z.infer<typeof profileSettingsSchema>;

const ProfileSettings = () => {
  const [avatarPreview, setAvatarPreview] = useState<string>(avtar);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProfileSettingsFormData>({
    resolver: zodResolver(profileSettingsSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      availability: "Available",
      jobTitle: "",
      experienceYears: "",
      currentProject: "CollabSpace – Web Platform",
    },
  });

  useEffect(() => {
    let mounted = true;
    getProfile()
      .then((response) => {
        if (!mounted) return;
        if (response.success) {
          const user = response.data.user;
          setAvatarPreview(user.avatar_url || avtar);
          reset({
            fullName: user.name || "",
            email: user.email || "",
            phone: user.phone || "",
            availability: user.status || "Available",
            jobTitle: user.job_title || "",
            experienceYears: user.years_of_experience
              ? `${user.years_of_experience} Years`
              : "",
            currentProject: "CollabSpace - Web Platform",
          });
        }
      })
      .catch(() => {
        // keep defaults
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [reset]);

  const currentFullName = watch("fullName");
  const phoneValue = watch("phone");

  const currentCountry = useMemo(
    () => detectCountryFromPhone(phoneValue),
    [phoneValue]
  );

  const handleSelectCountry = (country: typeof COUNTRIES[0]) => {
    const rawNumber = phoneValue ? phoneValue.replace(/^\+?\d+[\s-]*/, "") : "";
    setValue("phone", `${country.code} ${rawNumber}`.trim());
    setIsCountryDropdownOpen(false);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setAvatarPreview(imageUrl);
      setAvatarFile(file);
      toast.success("Profile photo selected. Save to apply.");
    }
  };

  const onSubmit = async (data: ProfileSettingsFormData) => {
    try {
      const formData = new FormData();
      if (avatarFile) {
        formData.append("avatar", avatarFile);
      }
      formData.append("job_title", data.jobTitle);
      formData.append(
        "years_of_experience",
        String(parseInt(data.experienceYears, 10) || 0),
      );
      formData.append("phone", data.phone);

      const response = await updateProfile(formData);
      if (response.success) {
        localStorage.setItem("username", data.fullName);
        localStorage.setItem("job_title", data.jobTitle);
        localStorage.setItem("avatar_url", avatarPreview);
        toast.success(response.message || "Profile updated successfully!");
      } else {
        toast.error(response.message || "Failed to update profile.");
      }
    } catch (error: unknown) {
      const message =
        (error as { response?: { data?: { message?: string } } })?.response?.data
          ?.message || "Failed to update profile. Please try again.";
      toast.error(message);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col gap-8 w-full pb-10 animate-pulse">
        <div className="flex items-center gap-4">
          <div className="size-20 rounded-full bg-gray-200" />
          <div className="h-8 w-48 rounded bg-gray-200" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-3 space-y-2">
            <div className="h-5 w-28 rounded bg-gray-200" />
            <div className="h-4 w-40 rounded bg-gray-200" />
          </div>
          <div className="lg:col-span-9 bg-white rounded-2xl p-6 border border-gray-100 shadow-xs grid grid-cols-1 sm:grid-cols-2 gap-4 gap-y-5">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="flex flex-col gap-1.5">
                <div className="h-3 w-24 rounded bg-gray-200" />
                <div className="h-10 w-full rounded-xl bg-gray-200" />
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-3 space-y-2">
            <div className="h-5 w-24 rounded bg-gray-200" />
            <div className="h-4 w-40 rounded bg-gray-200" />
          </div>
          <div className="lg:col-span-9 bg-white rounded-2xl p-6 border border-gray-100 shadow-xs flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <div className="h-3 w-20 rounded bg-gray-200" />
                <div className="h-10 w-full rounded-xl bg-gray-200" />
              </div>
              <div className="flex flex-col gap-1.5">
                <div className="h-3 w-32 rounded bg-gray-200" />
                <div className="h-10 w-full rounded-xl bg-gray-200" />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <div className="h-3 w-36 rounded bg-gray-200" />
              <div className="h-10 w-full rounded-xl bg-gray-200" />
            </div>
          </div>
        </div>
        <div className="h-11 w-full rounded-[1234px] bg-gray-200" />
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-8 w-full pb-10"
    >
      {/* ================= 1. AVATAR & NAME HEADER ================= */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <img
            src={avatarPreview}
            alt={currentFullName}
            className="size-18 md:size-20 rounded-full object-cover border-2 border-white shadow-xs"
          />

          {/* Edit Avatar Pencil Button */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            title="Change Profile Photo"
            className="absolute -bottom-1 -right-1 flex size-7 items-center justify-center rounded-full bg-white text-primary-blue-500 border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <SquarePen className="size-3.5" />
          </button>

          {/* Hidden File Input */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleAvatarChange}
            accept="image/*"
            className="hidden"
          />
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
          {currentFullName || "Mohamed Salah"}
        </h1>
      </div>

      {/* ================= 2. PERSONAL INFO SECTION ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Section Title & Description */}
        <div className="lg:col-span-3 flex flex-col">
          <h2 className="text-base font-semibold text-gray-900">Personal Info</h2>
          <p className="text-xs text-gray-500 mt-1 leading-relaxed">
            You can change your personal information settings here.
          </p>
        </div>

        {/* Right: Personal Info Card */}
        <div className="lg:col-span-9 bg-white rounded-2xl p-6 border border-gray-100 shadow-xs grid grid-cols-1 sm:grid-cols-2 gap-4 gap-y-5">
          {/* Full Name */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-gray-700">Full Name</label>
            <Input
              {...register("fullName")}
              startIcon={<User className="size-5 text-gray-400" />}
              className="bg-[#F9FAFB] rounded-xl"
              placeholder="Full Name"
            />
            {errors.fullName && (
              <span className="text-xs text-red-500">{errors.fullName.message}</span>
            )}
          </div>

          {/* Email Address */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-gray-700">
              Email Address
            </label>
            <Input
              type="email"
              {...register("email")}
              startIcon={<Mail className="size-5 text-gray-400" />}
              className="bg-[#F9FAFB] rounded-xl"
              placeholder="Email Address"
            />
            {errors.email && (
              <span className="text-xs text-red-500">{errors.email.message}</span>
            )}
          </div>

          {/* Phone Number */}
          <div className="flex flex-col gap-1.5 relative">
            <label className="text-xs font-medium text-gray-700">
              Phone Number
            </label>
            <div className="relative flex items-center w-full">
              {/* Dynamic Country Flag & Dropdown Trigger */}
              <button
                type="button"
                onClick={() => setIsCountryDropdownOpen((prev) => !prev)}
                className="absolute left-2.5 z-10 flex items-center gap-1.5 px-1.5 py-1 rounded-lg hover:bg-gray-200/60 transition-colors text-xs text-gray-700 cursor-pointer"
                title={`${currentCountry.name} (${currentCountry.code})`}
              >
                <CountryFlag iso={currentCountry.iso} alt={currentCountry.name} />
                <ChevronDown className="size-3 text-gray-400" />
              </button>

              {/* Country Picker Dropdown Menu */}
              {isCountryDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-20"
                    onClick={() => setIsCountryDropdownOpen(false)}
                  />
                  <div className="absolute top-full left-0 mt-1.5 w-64 max-h-56 overflow-y-auto bg-white rounded-xl border border-gray-200 shadow-lg z-30 py-1.5 divide-y divide-gray-50">
                    {COUNTRIES.map((c) => (
                      <button
                        key={c.code}
                        type="button"
                        onClick={() => handleSelectCountry(c)}
                        className={`w-full flex items-center justify-between px-3 py-2 text-xs hover:bg-blue-50/70 transition-colors cursor-pointer text-left ${
                          c.code === currentCountry.code
                            ? "bg-blue-50/50 font-medium text-primary-blue-500"
                            : "text-gray-700"
                        }`}
                      >
                        <span className="flex items-center gap-2.5">
                          <CountryFlag iso={c.iso} alt={c.name} />
                          <span>{c.name}</span>
                        </span>
                        <span className="text-gray-400 font-mono text-[11px]">
                          {c.code}
                        </span>
                      </button>
                    ))}
                  </div>
                </>
              )}

              {/* Input */}
              <Input
                {...register("phone")}
                className="pl-16 pr-9 bg-[#F9FAFB] rounded-xl"
                placeholder="+20 (123) 456-9878"
                endIcon={<HelpCircle className="size-4 text-gray-300" />}
              />
            </div>
            {errors.phone && (
              <span className="text-xs text-red-500">{errors.phone.message}</span>
            )}
          </div>

          {/* Availability Status */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-gray-700">
              Availability Status
            </label>
            <Input
              {...register("availability")}
              className="bg-[#F9FAFB] rounded-xl"
              placeholder="e.g. Available, Busy"
            />
            {errors.availability && (
              <span className="text-xs text-red-500">
                {errors.availability.message}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ================= 3. EXPERIENCE SECTION ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Section Title & Description */}
        <div className="lg:col-span-3 flex flex-col">
          <h2 className="text-base font-semibold text-gray-900">Experience</h2>
          <p className="text-xs text-gray-500 mt-1 leading-relaxed">
            You can change Experience settings here.
          </p>
        </div>

        {/* Right: Experience Card */}
        <div className="lg:col-span-9 bg-white rounded-2xl p-6 border border-gray-100 shadow-xs flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Job Title */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-gray-700">
                Job Title
              </label>
              <Input
                {...register("jobTitle")}
                className="bg-[#F9FAFB] rounded-xl"
                placeholder="Job Title"
              />
              {errors.jobTitle && (
                <span className="text-xs text-red-500">
                  {errors.jobTitle.message}
                </span>
              )}
            </div>

            {/* Years of Experience */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-gray-700">
                Years of Experience
              </label>
              <Input
                {...register("experienceYears")}
                className="bg-[#F9FAFB] rounded-xl"
                placeholder="Years of Experience"
              />
              {errors.experienceYears && (
                <span className="text-xs text-red-500">
                  {errors.experienceYears.message}
                </span>
              )}
            </div>
          </div>

          {/* Current Team / Project (Full Width) */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-gray-700">
              Current Team / Project
            </label>
            <Input
              {...register("currentProject")}
              className="bg-[#F9FAFB] rounded-xl w-full"
              placeholder="Current Team / Project"
            />
            {errors.currentProject && (
              <span className="text-xs text-red-500">
                {errors.currentProject.message}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ================= 4. SAVE BUTTON ================= */}
      <div className="w-full pt-2">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-11 bg-primary-blue-500 hover:bg-primary-blue-600 text-white rounded-[1234px] text-sm font-medium flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
        >
          <span>Save</span>
          <Check className="size-4" />
        </Button>
      </div>
    </form>
  );
};

export default ProfileSettings;
