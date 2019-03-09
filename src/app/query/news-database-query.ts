/**
 * Server Mutation Query
 */

'use strict';

import gql from 'graphql-tag';

export const filterNewsDatabase = gql`
  mutation filterNewsDatabase($value: String!, $page: String!, $perPage: String!, $active: String!, $direction: String!, $status: String!) {
    filterNewsDatabase(value: $value, page: $page, perPage: $perPage, active: $active, direction: $direction, status: $status) {
      total
      data {
        id
        name
        type
        status
      }
    }
  }`;

  export const getByIdNewsDatabase = gql`
  mutation getByIdNewsDatabase($id: String!) {
    getByIdNewsDatabase(id: $id) {
      id
      name
      type
      url
      status
    }
  }`;

  export const addNewsDatabase = gql`
  mutation addNewsDatabase($name: String!, $url: String!, $status: Boolean!, $type: String!) {
    addNewsDatabase(name: $name, url: $url, status: $status, type: $type) {
      id
    }
  }`;

  export const updateNewsDatabase = gql`
  mutation updateNewsDatabase($id: String!, $name: String!, $url: String!, $status: Boolean!, $type: String!) {
    updateNewsDatabase(name: $name, url: $url, status: $status, type: $type, id: $id) {
      id
    }
  }`;

  export const removeNewsDatabase = gql`
  mutation removeNewsDatabase($id: String!) {
    removeNewsDatabase(id: $id) {
      id
    }
  }`;