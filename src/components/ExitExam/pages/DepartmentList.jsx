import { Link } from "react-router-dom"
import { useGetDepartmentsQuery } from "../data/api/dataApi"

export default function DepartmentList() {
  const { data: departments, isLoading, isSuccess } = useGetDepartmentsQuery()
  
  // Skeleton loader array - creates 6 placeholders while loading
  const skeletons = Array(6).fill(0)
  
  return (
    <div className="bg-gray-50 py-12 pt-[180px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Departments</h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Choose your department to access subject-specific exit exam questions
          </p>
        </div>

        <div className="mt-12 grid gap-5 max-w-lg mx-auto lg:grid-cols-3 lg:max-w-none">
          {isLoading && 
            skeletons.map((_, index) => (
              <div key={`skeleton-${index}`} className="flex flex-col rounded-lg shadow-lg overflow-hidden bg-white">
                <div className="flex-1 p-6 flex flex-col justify-between">
                  <div className="flex-1">
                    <div className="mb-3">
                      {/* Image skeleton */}
                      <div className="w-full h-64 bg-gray-200 animate-pulse rounded"></div>
                    </div>
                    {/* Title skeleton */}
                    <div className="h-6 bg-gray-200 rounded animate-pulse w-3/4 mb-3"></div>
                    {/* Description skeleton - multiple lines */}
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          }

          {isSuccess && departments?.data.map((dept) => (
            <Link key={dept.id} to={`/department/${dept._id}`} className="flex flex-col rounded-lg shadow-lg overflow-hidden bg-white">
              <div className="flex-1 p-6 flex flex-col justify-between">
                <div className="flex-1">
                  <div className="text-4xl mb-3">
                    <img
                      src={dept.image || "/placeholder.svg"}
                      alt={dept.name}
                      className="w-full h-64 object-cover mx-auto"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">{dept.name}</h3>
                  <p className="mt-3 text-base text-gray-500">{dept.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}