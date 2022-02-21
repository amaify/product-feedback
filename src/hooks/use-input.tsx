import { useState } from "react";

type FormInputsType = {
	userInputValue: string;
	category: string;
};

function useInput(validateValue: (value: string) => boolean) {
	const [enteredValue, setEnteredValue] = useState<FormInputsType>({
		userInputValue: "",
		category: "feature",
	});
	const [isTouched, setIsTouched] = useState<boolean>(false);
	const [maxCharacters, setMaxCharacter] = useState<number>(250);
	const [charactersLeft, setCharactersLeft] = useState<number>(250);

	const [activeClick, setActiveClick] = useState(0);
	const [activeText, setActiveText] = useState("Feature");

	const valueIsValid = validateValue(enteredValue.userInputValue);
	const hasError = !valueIsValid && isTouched;

	const inputChangeHandler = (
		event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
	) => {
		const userInput = event.target.value;

		const char = event.target.value;

		const charCount = char.length;
		const maxChar = maxCharacters;

		const charLength = maxChar - charCount;

		setCharactersLeft(charLength);

		setEnteredValue({ ...enteredValue, userInputValue: userInput });
	};

	const inputBlurHandler = () => {
		setIsTouched(true);
	};

	const onSelectItemHandler = (item: { id: number; text: string }) => {
		setActiveClick(item.id);
		setActiveText(item.text);

		setEnteredValue({ ...enteredValue, category: item.text });
	};

	const resetUserInput = () => {
		setEnteredValue({
			...enteredValue,
			userInputValue: "",
		});
		setActiveText("Feature");
		setIsTouched(false);
		setCharactersLeft(250);
	};

	return {
		value: enteredValue.userInputValue,
		category: enteredValue.category,
		touched: isTouched,
		activeClick,
		activeText,
		inputChangeHandler,
		inputBlurHandler,
		resetUserInput,
		onSelectItemHandler,
		hasError: hasError,
		isValueValid: valueIsValid,
		charactersLeft,
	};
}

export default useInput;
