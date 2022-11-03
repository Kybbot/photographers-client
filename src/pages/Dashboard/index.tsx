import React, { FC } from "react";
import { useAppSelector } from "../../hooks/reduxHooks";
import { getUserAlbumsLength } from "../../redux/reducers/userSlice";

import { Photos } from "./Photos";
import { NoData } from "./NoData";

const Dashboard: FC = () => {
	const userAlbumsLength = useAppSelector(getUserAlbumsLength);

	if (userAlbumsLength > 0) {
		return <Photos />;
	} else {
		return <NoData />;
	}
};

export default Dashboard;
