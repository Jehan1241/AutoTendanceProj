import { useLocation } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";

function LoggedIn() {
  const location = useLocation();
  const [userId, setUserId] = useState();
  const [name, setName] = useState(null);
  const [branch, setBranch] = useState(null);
  const [year, setYear] = useState(null);

  useEffect(() => {
    // Set userId from location state
    const { userId } = location.state || {};
    setUserId(userId);

    // Fetch user information if userId is available
    if (userId) {
      const fetchUserInfo = async () => {
        try {
          const response = await fetch(
            `http://localhost:5000/getBasicInfo?rollno=${userId}`
          );
          if (!response.ok) throw new Error("Network response was not ok");
          const result = await response.json();
          setName(result.name);
          setYear(result.year);
          setBranch(result.branch);
          setUserInfo(result);
        } catch (error) {
          console.error("Error during fetch:", error);
        }
      };

      fetchUserInfo();
    }
  }, [location.state]);

  return (
    <div className="p-3 mx-5 mb-2 h-full text-black rounded-md border-2 border-black dark:text-white">
      <Tabs defaultValue="account" className="w-full">
        <TabsList>
          <TabsTrigger value="account">Details</TabsTrigger>
          <TabsTrigger value="password">Statistics</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <div>
            <Badge className="w-20">Name</Badge>{" "}
            <Badge variant="secondary" className="min-w-32">
              {name}
            </Badge>
          </div>
          {userId && (
            <div>
              <Badge className="w-20">Roll No</Badge>{" "}
              <Badge variant="secondary" className="min-w-32">
                {userId}
              </Badge>
            </div>
          )}
          <Badge className="w-20">Batch</Badge>{" "}
          <Badge variant="secondary" className="min-w-32">
            {branch}
          </Badge>
          <div>
            <Badge className="w-20">Year</Badge>{" "}
            <Badge variant="secondary" className="min-w-32">
              {year}
            </Badge>
          </div>
        </TabsContent>
        <TabsContent value="password">Change your password here.</TabsContent>
      </Tabs>
    </div>
  );
}

export default LoggedIn;
