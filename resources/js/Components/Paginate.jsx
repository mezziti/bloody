import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/Components/ui/pagination";

const Paginate = ({ links }) => {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          {!links[0].url ? "" : <PaginationPrevious href={links[0].url} />}
        </PaginationItem>
        {links.map((link) => (
          <PaginationItem key={link.label}>
            {link == links[0] || link == links[links.length - 1] ? (
              ""
            ) : (
              <PaginationLink
                isActive={link.active}
                href={link.url}
              >
                {link.label}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}
        <PaginationItem>
          {links[links.length - 1].url ? <PaginationNext href={links[links.length - 1].url} /> : ''}
          
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default Paginate;
