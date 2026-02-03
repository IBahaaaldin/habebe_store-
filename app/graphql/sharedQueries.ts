export const MAINMENU_AND_SUBMENU_QUERY = `#graphql
  query MainMenuAndSubmenu($handle: String!) {
    menu(handle: $handle) {
      title
      # /// ===== LEVEL 1 =====
      items {
        id
        title
        url

        resource {
          ... on Collection {
            handle
            title
            image {
              id
              url
              altText
              width
              height
            }
            # /// Fetch metafield for main banners only for 2nd level array
            mainBanners: metafield(namespace: "custom", key: "main_banners") {
              references(first: 10) {
                nodes {
                  ... on MediaImage {
                    image {
                      url
                      altText
                      width
                      height
                    }
                  }
                }
              }
            }
          }
        }
        # /// # ===== LEVEL 2 =====
        items {
          id
          title
          url
          resource {
            ... on Collection {
              handle
              title
              image {
                id
                url
                altText
                width
                height
              }
              # /// Fetch metafield for main banners only for 3th level array
              mainBanners: metafield(namespace: "custom", key: "main_banners") {
                references(first: 10) {
                  nodes {
                    ... on MediaImage {
                      image {
                        url
                        altText
                        width
                        height
                      }
                    }
                  }
                }
              }
            }
          }
          # /// ===== LEVEL 3 =====
          items {
          id
          title
          url
            resource {
              ... on Collection {
                handle
                title
                image {
                  id
                  url
                  altText
                  width
                  height
                }
                # /// Fetch metafield for main banners only for 2nd level array
                mainBanners: metafield(namespace: "custom", key: "main_banners") {
                  references(first: 10) {
                    nodes {
                      ... on MediaImage {
                        image {
                          url
                          altText
                          width
                          height
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    shop {
      name
      brand {
        logo {
          image {
            url
            altText
            width
            height
          }
        }
        shortDescription
        slogan
      }
    }
  }
` as const;