import React from "react";
import { Layout } from "../components";
import { gql } from "../__generated__/";

import { useQuery } from "@apollo/client";
import TrackCard from "../containers/track-card";
import QueryResult from "../components/query-result";

/** GET_TRACKS query to retrieve all tracks */
const GET_TRACKS = gql(`
query GetTracks {
  tracksForHome {
    id
    title
    thumbnail
    length
    modulesCount
    author {
      id
      name
      photo
    }
  }
}
`);

/**
 * Tracks Page is the Catstronauts home page.
 * We display a grid of tracks fetched with useQuery with the TRACKS query
 */
const Tracks = () => {
  // return <Layout grid>  </Layout>;

  const { loading, error, data } = useQuery(GET_TRACKS);
  // if (loading) return "Loading...";
  // if (error) return `Error! ${error.message}`;

  return (
    <Layout grid>
      <QueryResult error={error} loading={loading} data={data}>
        {data?.tracksForHome?.map((track) => (
          <TrackCard key={track.id} track={track} />
        ))}
      </QueryResult>
    </Layout>
    );
};



export default Tracks;
