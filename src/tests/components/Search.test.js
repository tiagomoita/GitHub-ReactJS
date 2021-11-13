import React from "react";
import renderer from "react-test-renderer";
import Search from './../../components/Search/Search';


test("Search Bar component render correctly with default values", () => {
  const component = renderer.create(
    <Search setValue={[]} page={1} count={0} setloading={true} />
    
  );
});


