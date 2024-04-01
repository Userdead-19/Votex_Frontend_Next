import { Button } from "@/components/ui/button";
import { CardContent, Card } from "@/components/ui/card";

export default function Component() {
  return (
    <div className="bg-gray-900 text-white min-h-screen p-8">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-xl font-bold">Election Central</h1>
          <p className="text-gray-400">Board Member Selection</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700">
          Cast My Vote
        </Button>
      </header>
      <main>
        <section aria-labelledby="category-heading" className="mb-8">
          <h2 className="text-lg font-semibold mb-4" id="category-heading">
            Executive Committee
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-gray-800">
              <CardContent className="flex flex-col items-center p-4">
                <div className="w-16 h-16 rounded-full border-2 border-gray-500 flex items-center justify-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-gray-600" />
                </div>
                <h3 className="text-md font-semibold mb-1">Jane Doe</h3>
                <p className="text-gray-400 mb-4">ID: 12345</p>
                <Button className="bg-green-500 hover:bg-green-600">
                  Select
                </Button>
              </CardContent>
            </Card>
            <Card className="bg-gray-800">
              <CardContent className="flex flex-col items-center p-4">
                <div className="w-16 h-16 rounded-full border-2 border-gray-500 flex items-center justify-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-gray-600" />
                </div>
                <h3 className="text-md font-semibold mb-1">John Smith</h3>
                <p className="text-gray-400 mb-4">ID: 67890</p>
                <Button className="bg-red-500 hover:bg-red-600">Select</Button>
              </CardContent>
            </Card>
            <Card className="bg-gray-800">
              <CardContent className="flex flex-col items-center p-4">
                <div className="w-16 h-16 rounded-full border-2 border-gray-500 flex items-center justify-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-gray-600" />
                </div>
                <h3 className="text-md font-semibold mb-1">Alex Johnson</h3>
                <p className="text-gray-400 mb-4">ID: 24680</p>
                <Button className="bg-red-500 hover:bg-red-600">Select</Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
}
