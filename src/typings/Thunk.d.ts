import { ReduxStateType } from 'redux/reduxWrapper';

interface ThunkInterface {
	state: ReduxStateType;
	rejectValue: Failure;
}
