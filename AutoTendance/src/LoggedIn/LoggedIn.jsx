import { useLocation } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

function LoggedIn() {
  const location = useLocation();
  const { userId } = location.state || {}; // Destructure userId from state

  return (
    <div className="p-3 mx-5 mb-2 h-full text-black rounded-md border-2 border-black dark:text-white">
      <Tabs defaultValue="account" className="w-full">
        <TabsList>
          <TabsTrigger value="account">Details</TabsTrigger>
          <TabsTrigger value="password">Statistics</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <p>
            <Badge className="w-20">Name</Badge>{" "}
            <Badge variant="secondary" className="min-w-32">
              Jehan Kotwal
            </Badge>
          </p>
          {userId && (
            <p>
              <Badge className="w-20">Roll No</Badge>{" "}
              <Badge variant="secondary" className="min-w-32">
                {userId}
              </Badge>
            </p>
          )}
          <Badge className="w-20">Batch</Badge>{" "}
          <Badge variant="secondary" className="min-w-32">
            BatchPlaceHolder
          </Badge>
          <p>
            <Badge className="w-20">Year</Badge>{" "}
            <Badge variant="secondary" className="min-w-32">
              FY/SY/TY/LY
            </Badge>
          </p>
        </TabsContent>
        <TabsContent value="password">Change your password here.</TabsContent>
      </Tabs>
    </div>
  );
}

export default LoggedIn;
