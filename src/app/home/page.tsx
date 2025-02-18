import React from "react";
import Home from "@/app/_component/Home";
import RQProvider from "@/lib/RQProvider";
import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
} from "@tanstack/react-query";
import { getBoard } from "@/fetchData/fetchData";

async function Page() {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ["board"],
        queryFn: getBoard,
    });
    const dehydratedState = dehydrate(queryClient);

    return (
        <RQProvider>
            <HydrationBoundary state={dehydratedState}>
                <Home />
            </HydrationBoundary>
        </RQProvider>
    );
}

export default Page;
