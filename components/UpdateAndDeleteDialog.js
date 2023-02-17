import { useRouter } from "next/router";
import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import TextField from "@mui/material/TextField";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";

export default function UpdateAndDeleteDialog(props) {
    const router = useRouter();
    const [date, setDate] = useState(props.date);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [modifiedStartTime, setModifiedStartTime] = useState(null);
    const [modifiedEndTime, setModifiedEndTime] = useState(null);
    const [name, setName] = useState(props.name);
    const [detail, setDetail] = useState(props.detail);
    const [errorMessage, setErrorMessage] = useState("");

    const handleClose = () => {
        props.setUpdateAndDeleteEventOpen(false);
    };
    const compareTime = (modifiedStartTime, modifiedEndTime) => {
        const startHour = Number(modifiedStartTime?.slice(0, 2));
        const endHour = Number(modifiedEndTime?.slice(0, 2));
        if (startHour >= endHour) {
            return false;
        } else if (startHour < endHour) {
            return true;
        }
    };

    const testError = () => {
        if (!date || !modifiedStartTime || !modifiedEndTime) {
            let dateUndefined = "";
            let startUndefined = "";
            let endUndefined = "";
            if (!date) {
                dateUndefined = "날짜";
            }
            if (!modifiedStartTime) {
                startUndefined = "시작 시간";
            }
            if (!modifiedEndTime) {
                endUndefined = "종료 시간";
            }
            setErrorMessage(
                `${dateUndefined} ${startUndefined} ${endUndefined}를 선택해주세요.`
            );
            dateUndefined = "";
            startUndefined = "";
            endUndefined = "";
            return true;
        } else {
            const compareTest = compareTime(modifiedStartTime, modifiedEndTime);
            if (compareTest) {
                return false;
            } else if (!compareTest) {
                setErrorMessage("예약 시간을 수정해주세요.");
                setStartTime(null);
                setEndTime(null);
                return true;
            }
        }
    };
    const handleUpdate = async (e) => {
        setErrorMessage("");
        await fetch(`/api/timetable/updateEvent`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                detail,
                date,
                modifiedStartTime,
                modifiedEndTime,
                id: props.id,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.statusCode === "200") {
                    router.push("/timeTable");
                } else if (data.statusCode === "500") {
                    router.push("/timeTable");
                }
            });
    };
    const handleDelete = async (e) => {
        setErrorMessage("");
        await fetch(`/api/timetable/deleteEvent`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: props.id,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.statusCode === "200") {
                    router.push("/timeTable");
                } else if (data.statusCode === "500") {
                    router.push("/timeTable");
                }
            });
    };
    const dateModifier = (d) => {
        return new Date(d.getTime() - d.getTimezoneOffset() * 60000)
            .toISOString()
            .slice(0, 10)
            .replace(/-/g, "-");
    };

    const timeModifier = (d) => {
        return new Date(d.getTime() - d.getTimezoneOffset() * 60000)
            .toISOString()
            .slice(11, 16)
            .replace(/-/g, "-");
    };

    return (
        <div>
            {/* <Button onClick={handleOpen}>Let's reserve</Button> */}
            <Dialog open={true} onClose={handleClose}>
                <DialogTitle>동방 예약</DialogTitle>
                <DialogContent>
                    <DialogContentText style={{ marginBottom: "15px" }}>
                        {errorMessage}
                    </DialogContentText>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            const consequence = testError();
                            if (!consequence) {
                                handleUpdate();
                                handleClose();
                            }
                        }}
                    >
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                disablePast
                                label="날짜를 선택해주세요"
                                value={date}
                                onChange={(newValue) => {
                                    const d = newValue.$d;
                                    setDate(dateModifier(d));
                                }}
                                renderInput={(params) => (
                                    <TextField {...params} />
                                )}
                            />
                            <div
                                style={{
                                    marginTop: "25px",
                                    marginBottom: "15px",
                                }}
                            >
                                <TimePicker
                                    disablePast={true}
                                    minutesStep={60}
                                    label="시작 시간을 선택해주세요"
                                    value={startTime}
                                    views={["hours", "minutes"]}
                                    onChange={(newValue) => {
                                        const d = newValue.$d;
                                        setModifiedStartTime(timeModifier(d));
                                        setStartTime(newValue);
                                    }}
                                    renderInput={(params) => (
                                        <TextField {...params} />
                                    )}
                                />
                                <TimePicker
                                    disablePast={true}
                                    minutesStep={60}
                                    label="종료 시간을 선택해주세요"
                                    value={endTime}
                                    views={["hours", "minutes"]}
                                    onChange={(newValue) => {
                                        const d = newValue.$d;
                                        setModifiedEndTime(timeModifier(d));
                                        setEndTime(newValue);
                                    }}
                                    renderInput={(params) => (
                                        <TextField {...params} />
                                    )}
                                />
                            </div>
                        </LocalizationProvider>
                        <Input
                            type="text"
                            placeholder="이름"
                            value={name}
                            onChange={({ target }) => setName(target.value)}
                            style={{
                                marginBottom: "8px",
                            }}
                            required
                        />
                        <Input
                            type="text"
                            placeholder="용무"
                            value={detail}
                            onChange={({ target }) => setDetail(target.value)}
                            required
                        />
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                            <Button
                                type="submit"
                                variant="outlined"
                                style={{
                                    marginTop: "8px",
                                    width: "100px",
                                }}
                            >
                                변경
                            </Button>
                        </div>
                    </form>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        <Button
                            type="submit"
                            variant="outlined"
                            style={{
                                marginTop: "8px",
                                width: "100px",
                            }}
                            onClick={() => {
                                handleDelete();
                                handleClose();
                            }}
                        >
                            삭제
                        </Button>
                    </div>
                </DialogContent>
                <DialogActions></DialogActions>
            </Dialog>
        </div>
    );
}
