import { useQuery } from "@tanstack/react-query";
import { getProjects } from "../api/projects-api";

export const useGetProjects = ()=> {

    return useQuery({
        queryKey: ["projects"] , 
        queryFn: ()=> getProjects() , 
        staleTime: 5 * 60 * 1000,
    })
} 