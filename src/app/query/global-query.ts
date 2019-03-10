/**
 * Server Mutation Query
 */

'use strict';

import gql from 'graphql-tag';

// export const dashboard = gql`
//   mutation dashboard {
//     dashboard {
//       database
//       news
//     }
//   }`;

export const filterNews = gql`
  mutation filterNews($value: String!, $page: String!, $perPage: String!, $active: String!, $direction: String!, $status: String!) {
    filterNews(value: $value, page: $page, perPage: $perPage, active: $active, direction: $direction, status: $status) {
      total
      data {
        id
        title
        description
        imageUrl
        status
      }
    }
  }`;

export const Users = gql`
  query {
    users{
      id
      name
    }
  }`;

export const removeUser = gql`
  mutation removeUser($id: String!) {
    removeUser(id: $id) {
      id
      name
    }
  }`;

export const updateUser = gql`
  mutation updateUser($id: String!, $name: String!) {
    updateUser(id: $id, name: $name) {
      id
      name
    }
  }`;

export const deliveryPrice = gql`
  mutation deliveryPrice($zipcode: String!, $totalPrice: String!) {
    deliveryPrice(zipcode: $zipcode, totalPrice: $totalPrice) {
      Codigo
      Valor
      PrazoEntrega
      Erro
      MsgErro
    }
  }`;
