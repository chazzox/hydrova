import { ReduxStateType } from 'reduxStore/reduxWrapper';
interface ThunkInterface {
	state: ReduxStateType;
	rejectValue: Failure;
}
