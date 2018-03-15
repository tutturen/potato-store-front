import gql from 'graphql-tag';

export default gql`
  query GetProducts(
    $text: String
    $minPrice: Float
    $maxPrice: Float
    $onSale: Boolean
    $organic: Boolean
    $category: [ID]
  ) {
    allProducts(
      filter: {
        text: $text
        minPrice: $minPrice
        maxPrice: $maxPrice
        onSale: $onSale
        organic: $organic
        category: $category
      }
    ) {
      id
      name
      unit
      price
      subtitle
      image
    }
    allCategories {
      id
      name
    }
  }
`;
