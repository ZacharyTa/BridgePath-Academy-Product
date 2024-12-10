import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Logo from "@/public/icons/icon.png";
import { CertificateProps } from "@/libs/types";
import { getSkillPathId, getCertificationId } from "@/helper/useCookies";

export function Certificate({
  certificationName,
  dateAcquired,
  issuer,
  recipientName,
  skills,
  hasProject,
}: CertificateProps) {
  const skillPathId = getSkillPathId();
  const certId = skillPathId ? getCertificationId(skillPathId) : null;

  return (
    <Card className="mx-auto w-full max-w-3xl bg-white shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex flex-col space-y-1.5">
          <h2 className="text-2xl font-semibold tracking-tight">
            {certificationName}
          </h2>
          <p className="text-muted-foreground text-sm">Issued by {issuer}</p>
        </div>
        <img src={Logo.src} alt="Logo" className="h-10 w-10" />
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Awarded to:</p>
              <p className="text-lg font-bold">{recipientName}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium">Date Acquired:</p>
              <p className="text-lg">{dateAcquired}</p>
            </div>
          </div>
          <div>
            <p className="mb-2 text-sm font-medium">Skills Acquired:</p>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <Badge key={index} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
          {certId && (
            <div>
              <p className="mb-2 text-sm font-medium">Certification ID:</p>
              <p className="text-lg font-bold">{certId}</p>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <p className="text-muted-foreground text-sm">
          Verify at: bridgepath.academy/verify
        </p>
        {hasProject && (
          <Badge variant="default" className="bg-green-500 hover:bg-green-600">
            Project Completed
          </Badge>
        )}
      </CardFooter>
    </Card>
  );
}
