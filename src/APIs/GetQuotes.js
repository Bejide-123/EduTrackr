export const getQuotes = async (setQuotes) => {
      try {
            const response = await fetch("/api/random?tags=education", {
                  method: "GET",
            });

            if (!response.ok) {
                  throw new Error("Error fetching quotes");
            }

            const data = await response.json();
            setQuotes(data.content);
            console.log(data.content);

            return data;
      } catch (error) {
            console.error("Error fetching quotes:", error);
            return null;
      }
};
