
import Pagination from 'react-js-pagination';
import { PageContainer, PageNationWrap } from './styled'

interface GreetingProps {
  curPage: number;
  totalPages: number;
  pageChangeHandler: (page: number) => void;
}

function PageNation({
  curPage,
  totalPages,
  pageChangeHandler,
}: GreetingProps) {

	return (
		<>
			<PageContainer>
				<PageNationWrap>
					{window.scrollTo(0, 0)}
					<Pagination
							activePage={curPage}
							itemsCountPerPage={1}
							pageRangeDisplayed={5}
							totalItemsCount={totalPages}
							prevPageText="<"
							nextPageText=">"
							onChange={pageChangeHandler}
						/>
				</PageNationWrap>
			</PageContainer>
		</>
	);
}

export default PageNation;