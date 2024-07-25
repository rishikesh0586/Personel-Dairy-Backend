export const search = (query:any, queryStr:any) => {
    const keyword = queryStr.keyword
      ? {
          name: {
            $regex: queryStr.keyword,
            $options: "i",
          },
        }
      : {};
  
    return query.find({ ...keyword });
  };
  
  
// interface IQuery<T> extends Query<T, any> {
//   query: string;
// }
  // type QueryStrType = {
  //   keyword?: string;
  //   page?: string;
  //   limit?: string;
  //   [key: string]: any;
  // };

  export const filter = (query:any, queryStr:any) => {
    const queryCopy = { ...queryStr };
    const removeFields = ["keyword", "page", "limit"];
  
    removeFields.forEach((key) => delete queryCopy[key]);
  
    let queryStrModified = JSON.stringify(queryCopy);
    queryStrModified = queryStrModified.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);
  
    return query.find(JSON.parse(queryStrModified));
  };
  
  export const pagination = (query:any, queryStr:any, resultPerPage:number) => {
    const currentPage = Number(queryStr.page) || 1;
    const skip = resultPerPage * (currentPage - 1);
  
    return query.limit(resultPerPage).skip(skip);
  };
  