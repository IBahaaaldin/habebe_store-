import { redirect, useLoaderData } from 'react-router';
import type { Route } from './+types/($locale).collections.$handle';
import { getPaginationVariables } from '@shopify/hydrogen';
import { PaginatedResourceSection } from '~/components/PaginatedResourceSection';
import { redirectIfHandleIsLocalized } from '~/lib/redirect';
import { ProductItem } from '~/components/ProductItem';
import type { ProductFragment } from 'storefrontapi.generated';
import { AllCategories, CollectionsNewHero } from '~/components/MINE/CollectionsHero';
import { MAINMENU_AND_SUBMENU_QUERY } from '~/graphql/sharedQueries';
import MainBanners, { CasualBanners, GridBanners } from '~/components/MINE/AdsSections';
import { useNavigate, useLocation } from 'react-router';
import { useState, useMemo, useRef, useEffect } from 'react';
import { ArrowDown, Check, Filter, Search, ArrowUpDown, Shuffle } from 'lucide-react';

/**
 * Meta function for SEO and page title
 */
export const meta: Route.MetaFunction = ({ data }) => {
  return [{ title: `HABEBE | ${data?.collection.title ?? ''} Collection` }];
};

/**
 * Loader function to fetch critical and deferred data
 */
export async function loader(args: Route.LoaderArgs) {
  const deferredData = loadDeferredData(args);
  const criticalData = await loadCriticalData(args);

  return { ...deferredData, ...criticalData };
}

/**
 * Fetches critical data needed for the initial render
 */
async function loadCriticalData({ context, params, request }: Route.LoaderArgs) {
  const { handle } = params;
  const { storefront } = context;

  if (!handle) {
    throw redirect('/collections');
  }

  const searchParams = new URL(request.url).searchParams;

  // 1. Get standard pagination variables
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 15,
  });

  // 2. Correctly parse filters from the URL
  const filters: any[] = [];
  for (const [key, value] of searchParams.entries()) {
    if (key.startsWith('filter.')) {
      try {
        const parsedValue = JSON.parse(value);
        filters.push(typeof parsedValue === 'string' ? JSON.parse(parsedValue) : parsedValue);
      } catch (e) {
        console.error(`Failed to parse filter: ${value}`, e);
      }
    }
  }

  // 3. Parse sorting from the URL
  // Default to 'RANDOM' if no sortKey is provided
  const sortKey = searchParams.get('sortKey');
  const reverse = searchParams.get('reverse') === 'true';
  const isRandom = !sortKey || sortKey === 'RANDOM';

  // 4. Fetch data from Shopify Storefront API
  const [{ collection }, { menu }] = await Promise.all([
    storefront.query(COLLECTION_QUERY, {
      variables: {
        handle,
        filters,
        // If RANDOM, we use default Shopify sorting and shuffle on the client
        sortKey: isRandom ? 'COLLECTION_DEFAULT' : (sortKey as any),
        reverse: isRandom ? false : reverse,
        ...paginationVariables,
      },
    }),
    storefront.query(MAINMENU_AND_SUBMENU_QUERY, {
      variables: { handle: 'main-menu' }
    }),
  ]);

  if (!collection) {
    throw new Response(`Collection ${handle} not found`, { status: 404 });
  }

  redirectIfHandleIsLocalized(request, { handle, data: collection });

  return { collection, menu };
}

function loadDeferredData({ context }: Route.LoaderArgs) {
  return {};
}

/**
 * Main Collection Component with Sticky Horizontal Filters
 */
export default function Collection() {
  const { collection, menu } = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  const { search } = useLocation();

  // State for active dropdown
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);


  // Logic to find the specific menu items for this collection
  const specificMenu = useMemo(() => {
    return menu?.items?.find((menuItem: any) => menuItem.title === collection.title)?.items ??
      menu?.items[0]?.items.find((menuItem: any) => menuItem.title === collection.title)?.items ?? [];
  }, [menu, collection.title]);



  // Logic to find banners associated with this collection
  const bannersArray = useMemo(() => {
    return menu?.items.find((item: any) => item.title === collection.title)?.resource?.mainBanners?.references?.nodes ??
      menu?.items[0]?.items.find((item: any) => item.title === collection.title)?.resource?.mainBanners?.references?.nodes ?? [];
  }, [menu, collection.title]);



  // Normalizes filter IDs to ensure they start with the 'filter.' prefix
  const getFilterKey = (filterId: string) => {
    return filterId.startsWith('filter.') ? filterId : `filter.${filterId}`;
  };



  // Toggles a specific filter value in the URL search parameters
  const toggleFilter = (filterId: string, input: any) => {
    const params = new URLSearchParams(search);
    const filterKey = getFilterKey(filterId);
    const inputString = JSON.stringify(input);

    const existingValues = params.getAll(filterKey);

    if (existingValues.includes(inputString)) {
      const newParams = new URLSearchParams();
      for (const [key, value] of params.entries()) {
        if (!(key === filterKey && value === inputString)) {
          newParams.append(key, value);
        }
      }
      newParams.delete('cursor');
      newParams.delete('direction');
      navigate(`?${newParams.toString()}`, { preventScrollReset: true });
    } else {
      params.append(filterKey, inputString);
      params.delete('cursor');
      params.delete('direction');
      navigate(`?${params.toString()}`, { preventScrollReset: true });
    }
  };



  // Updates the price range filter in the URL search parameters
  const updatePriceFilter = (filterId: string, min?: string, max?: string) => {
    const params = new URLSearchParams(search);
    const filterKey = getFilterKey(filterId);
    const priceInput: any = { price: {} };
    if (min) priceInput.price.min = parseFloat(min);
    if (max) priceInput.price.max = parseFloat(max);

    params.delete(filterKey);
    if (min || max) {
      params.set(filterKey, JSON.stringify(priceInput));
    }

    params.delete('cursor');
    params.delete('direction');
    navigate(`?${params.toString()}`, { preventScrollReset: true });
  };


  // Checks if a specific filter value is currently active in the URL
  const isFilterActive = (filterId: string, input: any) => {
    const params = new URLSearchParams(search);
    const filterKey = getFilterKey(filterId);
    return params.getAll(filterKey).includes(JSON.stringify(input));
  };


  // Removes all active filters from the URL search parameters
  const clearFilters = () => {
    const params = new URLSearchParams(search);
    const keysToRemove = Array.from(params.keys()).filter(key => key.startsWith('filter.'));
    keysToRemove.forEach(key => params.delete(key));
    params.delete('cursor');
    params.delete('direction');
    navigate(`?${params.toString()}`, { preventScrollReset: true });
  };

  const activeFilterCount = Array.from(new URLSearchParams(search).keys())
    .filter(key => key.startsWith('filter.')).length;

  // Sorting logic
  const sortOptions = [
    { label: 'Random', key: 'TITLE', reverse: false },
    { label: 'Featured', key: 'COLLECTION_DEFAULT', reverse: false },
    { label: 'Price: Low to High', key: 'PRICE', reverse: false },
    { label: 'Price: High to Low', key: 'PRICE', reverse: true },
    // { label: 'Name: A-Z', key: 'TITLE', reverse: false },
    // { label: 'Name: Z-A', key: 'TITLE', reverse: true },
    { label: 'Newest', key: 'CREATED', reverse: true },
    { label: 'Oldest', key: 'CREATED', reverse: false },
  ];

  const currentSortKey = new URLSearchParams(search).get('sortKey') || 'RANDOM';
  const currentReverse = new URLSearchParams(search).get('reverse') === 'true';
  const currentSortLabel = sortOptions.find(opt => opt.key === currentSortKey && opt.reverse === currentReverse)?.label || 'Sort';

  const handleSortChange = (key: string, reverse: boolean) => {
    const params = new URLSearchParams(search);
    params.set('sortKey', key);
    params.set('reverse', reverse.toString());
    params.delete('cursor');
    params.delete('direction');
    navigate(`?${params.toString()}`, { preventScrollReset: true });
    setActiveDropdown(null);
  };

  // Client-side random shuffling if "Random" is selected
  // We use a ref to store the shuffled order so it doesn't re-shuffle on every render
  // unless the products from the server actually change or the user re-selects Random.
  const processedProducts = useMemo(() => {
    const nodes = [...collection.products.nodes];
    if (currentSortKey === 'RANDOM') {
      // Fisher-Yates shuffle
      for (let i = nodes.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [nodes[i], nodes[j]] = [nodes[j], nodes[i]];
      }
    }
    return nodes;
  }, [collection.products.nodes, currentSortKey]);


  return (
    <div className="flex flex-col gap-10 overflow-hidden">
      {/* Hero Section */}
      <CollectionsNewHero
        Title={collection.title}
        Description={collection.description}
        Collections={collection as any}
        HeroImg={collection.image?.url}
        subTwoMenus={specificMenu.slice(0, 2)}
      />


      {/* Categories Navigation */}
      <AllCategories allSubMenus={specificMenu} />

      {/* Promotional Banners */}
      {/* <MainBanners bannerArray={bannersArray} /> */}
      <GridBanners collectionHandle={collection.handle} bannerArray={bannersArray} />


      {/* STICKY HORIZONTAL FILTER BAR */}
      <div>
        <div
          className="relative flex flex-row w-full gap-3 justify-start items-center"
          ref={dropdownRef}
        >
          <div className="flex items-center gap-2 pr-3 border-r border-zinc-200">
            <Filter size={17} />
            <span className="uppercaser">Filters</span>
          </div>

          <div className="overflow-x-scroll ROW_SCROLL flex items-center gap-3 w-full border-b border-zinc-300">
            {/* Sort Dropdown */}
            <div className="min-w-max">
              <button
                onClick={() => setActiveDropdown(activeDropdown === 'sort' ? null : 'sort')}
                className={`flex items-center gap-2 px-4 py-2 capitalize border transition-all rounded-xl ${activeDropdown === 'sort' ? 'border-orange-200 bg-orange-400 text-white' : 'border-zinc-200 bg-zinc-50 text-black hover:border-zinc-400'
                  }`}
              >
                {currentSortKey === 'RANDOM' ? <Shuffle size={14} /> : <ArrowUpDown size={14} />}
                <span className='text-nowrap'>
                  {currentSortLabel}
                </span>
                <ArrowDown className={`w-3 h-3 transition-transform ${activeDropdown === 'sort' ? 'rotate-180' : ''}`} />
              </button>

              {activeDropdown === 'sort' && (
                <div className="absolute top-full left-0 mt-2 rounded-2xl flex flex-col bg-white border border-zinc-200 shadow-2xl p-4 z-50 min-w-50">
                  {sortOptions.map((option) => {
                    const isSelected = currentSortKey === option.key && currentReverse === option.reverse;
                    return (
                      <button
                        key={`${option.key}-${option.reverse}`}
                        onClick={() => handleSortChange(option.key, option.reverse)}
                        className={`flex items-center justify-between w-full py-2 px-3 rounded-lg transition-all ${isSelected ? 'bg-orange-50 text-orange-600 font-medium' : 'text-zinc-600 hover:bg-zinc-50'
                          }`}
                      >
                        <div className="flex items-center gap-2">
                          {option.key === 'RANDOM' && <Shuffle size={12} />}
                          <span>{option.label}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Filter Dropdowns */}
            {collection.products.filters.map((filter: any) => {
              const isActive = activeDropdown === filter.id;
              const isPriceFilter = filter.type === 'PRICE_RANGE';
              const hasActiveValues = filter.values?.some((v: any) => isFilterActive(filter.id, v.input));

              return (
                <div
                  key={filter.id}
                  className="min-w-max"
                >
                  <button
                    onClick={() => setActiveDropdown(isActive ? null : filter.id)}
                    className={`flex items-center gap-2 px-4 py-2 capitalize border transition-all rounded-xl ${isActive || hasActiveValues ? 'border-orange-200 bg-orange-400 text-white' : 'border-zinc-200 bg-zinc-50 text-black hover:border-zinc-400'
                      }`}
                  >
                    <span className='text-nowrap'>
                      {filter.label}
                    </span>
                    <ArrowDown className={`w-3 h-3 transition-transform ${isActive ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown Content */}
                  {isActive && (
                    <div className="absolute top-full left-0 mt-2 rounded-2xl flex gap-10 bg-white border border-zinc-200 shadow-2xl p-6 z-50 w-100">
                      {isPriceFilter ? (
                        <div className="space-y-4" onBlur={() => setActiveDropdown(null)}>
                          <div className="flex items-center gap-2">
                            <div className="relative flex-1">
                              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 ">$</span>
                              <input
                                type="number"
                                placeholder="Min"
                                className="w-full pl-6 pr-2 py-2 border border-zinc-200 focus:border-black rounded-xl"
                                onBlur={(e) => updatePriceFilter(filter.id, e.target.value, (document.getElementById(`max-${filter.id}`) as HTMLInputElement)?.value)}
                                id={`min-${filter.id}`}
                              />
                            </div>
                            <span className="text-zinc-300">—</span>
                            <div className="relative flex-1">
                              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 ">$</span>
                              <input
                                type="number"
                                placeholder="Max"
                                className="w-full pl-6 pr-2 py-2 border border-zinc-200 focus:border-black rounded-xl"
                                onBlur={(e) => updatePriceFilter(filter.id, (document.getElementById(`min-${filter.id}`) as HTMLInputElement)?.value, e.target.value)}
                                id={`max-${filter.id}`}
                              />
                            </div>
                          </div>
                          <button
                            onClick={() => setActiveDropdown(null)}
                            className="BUTTON1 w-full"
                          >
                            Apply
                          </button>
                        </div>
                      ) : (
                        <div className="flex flex-col w-full max-h-50 overflow-y-auto space-y-2">
                          {filter.values.map((value: any) => {
                            const active = isFilterActive(filter.id, value.input);
                            return (
                              <button
                                key={value.id}
                                onClick={() => toggleFilter(filter.id, value.input)}
                                className={`flex gap-10 items-center justify-between w-full py-1 transition-all group ${active ? 'text-black font-medium' : 'text-zinc-500 hover:text-black'
                                  }`}
                              >
                                <div className="flex items-center gap-3">
                                  <div className={`w-4 h-4 border flex rounded-sm items-center justify-center transition-all ${active ? 'bg-orange-400 border-orange-400' : 'border-zinc-200 group-hover:border-zinc-400'
                                    }`}>
                                    {active && (
                                      <Check className="w-2.5 h-2.5 text-white" strokeWidth={4} />
                                    )}
                                  </div>
                                  <span className="text-wrap">{value.label}</span>
                                </div>
                                <span className="font-bold text-zinc-300">
                                  {value.count}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}


            {activeFilterCount > 0 && (
              <button
                onClick={clearFilters}
                className="text-red-600 hover:text-red-800 transition-colors text-nowrap pl-3 border-l border-zinc-200"
              >
                <span className='font-bold'>
                  Clear ({activeFilterCount})
                </span>
              </button>
            )}
          </div>
        </div>
        {/* </div> */}

        {/* Product Grid Section */}
        <div className="mt-10">
          {processedProducts.length > 0 ? (
            <div className="space-y-16">
              {/* Secondary Banners */}
              <CasualBanners collectionHandle={collection.handle} bannerArray={bannersArray} />

              {/* Paginated Product List */}
              <PaginatedResourceSection<any>
                connection={{
                  ...collection.products,
                  nodes: processedProducts
                }}
              >
                {({ node: product, index }) => (
                  <ProductItem
                    key={product.id}
                    product={product}
                    loading={index < 15 ? 'eager' : undefined}
                  />
                )}
              </PaginatedResourceSection>
            </div>
          ) : (
            /* Empty State */
            <div className="bg-zinc-50 flex flex-col items-center justify-center py-20 text-center border-2 border-dashed border-zinc-300 rounded-3xl">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6">
                <Search />
              </div>

              <h3 className="text-lg font-bold text-zinc-900 uppercase tracking-tight">No results found</h3>
              <p className="mt-2 text-sm text-zinc-500 max-w-xs mx-auto">Try adjusting your filters or clearing them to see more products.</p>
              <button
                onClick={clearFilters}
                className="mt-8 px-8 py-3 bg-black text-white font-bold uppercase tracking-widest hover:bg-zinc-800 transition-colors"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * GraphQL Fragment for Product Item
 */
export const PRODUCT_ITEM_FRAGMENT = `#graphql
  fragment MoneyProductItem on MoneyV2 {
    amount
    currencyCode
  }
  fragment ProductItem on Product {
    id
    handle
    title
    description
    descriptionHtml
    vendor
    tags
    encodedVariantExistence
    encodedVariantAvailability
    featuredImage {
      id
      altText
      url
      width
      height
    }
    media(first: 10) {
      nodes {
        mediaContentType
        alt
        ... on MediaImage {
          image {
            id
            url
            width
            height
          }
        }
        ... on Video {
          sources {
            url
          }
        }
      }
    }
    priceRange {
      minVariantPrice {
        ...MoneyProductItem
      }
      maxVariantPrice {
        ...MoneyProductItem
      }
    }
    variants(first: 1) {
      nodes {
        id
        availableForSale
        selectedOptions {
          name
          value
        }
      }
    }
    options {
      name
      values: optionValues {
        name
      }
    }
  }
` as const;

/**
 * GraphQL Query for Collection and its Products
 */
export const COLLECTION_QUERY = `#graphql
  ${PRODUCT_ITEM_FRAGMENT}
  query Collection(
    $handle: String!
    $country: CountryCode
    $language: LanguageCode
    $filters: [ProductFilter!]
    $sortKey: ProductCollectionSortKeys
    $reverse: Boolean
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
  ) @inContext(country: $country, language: $language) {
    collection(handle: $handle) {
      id
      handle
      title
      description
      image {
        id
        url
        altText
      }
      products(
        first: $first,
        last: $last,
        before: $startCursor,
        after: $endCursor,
        filters: $filters,
        sortKey: $sortKey,
        reverse: $reverse
      ) {
        nodes {
          ...ProductItem
        }
        filters { 
          id
          label
          type
          values {
            id
            label
            count
            input
          }
        }
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
      }
    }
  }
` as const;
