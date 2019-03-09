/**
 * Server Mutation Query
 */

'use strict';

import gql from 'graphql-tag';

export const filterNews = gql`
  mutation filterNews($value: String!, $page: String!, $perPage: String!, $active: String!, $direction: String!, $status: String!) {
    filterNews
    (value: $value, page: $page, perPage: $perPage, active: $active, direction: $direction, status: $status) {
      total
      data {
        id
        title
        description
        status 
      }
    }
  }`;

  export const getByIdNews = gql`
  mutation getByIdNews($id: String!) {
    getByIdNews(id: $id) {
      id
      title
      description
      imageUrl
      fileName
      status 
      showTimeMilliseconds
    }
  }`;

  export const addNews = gql`
  mutation addNews($title: String!, $description: String!, $imageUrl: String!, $fileName: String!, $status: Boolean, 
    $showTimeMilliseconds: Int!) {
    addNews(title: $title, description: $description, imageUrl: $imageUrl, fileName: $fileName, status: $status, 
        showTimeMilliseconds: $showTimeMilliseconds) {
      id
    }
  }`;

  export const updateNews = gql`
  mutation updateNews($id: String!, $title: String!, $description: String!, $imageUrl: String!, $fileName: String!, $status: Boolean, 
    $showTimeMilliseconds: Int!) {
    updateNews(title: $title, description: $description, imageUrl: $imageUrl, fileName: $fileName, status: $status, 
        showTimeMilliseconds: $showTimeMilliseconds, id: $id) {
      id
    }
  }`;

  export const removeNews = gql`
  mutation removeNews($id: String!) {
    removeNews(id: $id) {
      id
    }
  }`;