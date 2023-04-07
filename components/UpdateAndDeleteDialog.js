import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import TextField from "@mui/material/TextField";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import { TimePicker } from "antd";
import dayjs from "dayjs";

export default function UpdateAndDeleteDialog(props) {
    const router = useRouter();
    const [date, setDate] = useState(props.date);
    const format = "HH:mm";
    const [startTime, setStartTime] = useState(dayjs(props.startTime, format));
    const [endTime, setEndTime] = useState(dayjs(props.endTime, format));
    const [modifiedStartTime, setModifiedStartTime] = useState(props.startTime);
    const [modifiedEndTime, setModifiedEndTime] = useState(props.endTime);
    const [name, setName] = useState(props.name);
    const [detail, setDetail] = useState(props.detail);
    const [password, setPassword] = useState("");
    const [enableUpdate, setEnableUpdate] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const { data: session, status } = useSession();
    useEffect(() => {
        if (session?.user?.name === "manager") {
            setEnableUpdate(true);
        }
    }, [session?.user?.name]);

    useEffect(() => {
        const startHour = Number(modifiedStartTime?.slice(0, 2));
        const autoEndHour = String(startHour + 2).padStart(2, "0");
        const d = startTime?.$d;
        if (d) {
            const offsetAppliedDate =
                d.getTime() - d.getTimezoneOffset() * 60000;
            const frontPart = new Date(offsetAppliedDate)
                .toISOString()
                .slice(0, 11);
            const backPart = new Date(offsetAppliedDate)
                .toISOString()
                .slice(13, 24);
            const complete = dayjs(frontPart + autoEndHour + backPart).subtract(
                9,
                "hour"
            );
            const twentyThree = dayjs(frontPart + "23" + backPart)
                .subtract(9, "hour")
                .set("minute", 59);
            if (startHour + 2 < 24) {
                setEndTime(complete);
                setModifiedEndTime(timeModifier(complete.$d));
            } else if (startHour + 2 >= 24) {
                setEndTime(twentyThree);
                setModifiedEndTime(timeModifier(twentyThree.$d));
            }
        }
    }, [startTime, modifiedStartTime]);

    const handleClose = () => {
        props.setUpdateAndDeleteEventOpen(false);
    };
    const compareTime = (modifiedStartTime, modifiedEndTime) => {
        const startNum = Number(
            modifiedStartTime?.slice(0, 2) + modifiedStartTime?.slice(3, 5)
        );
        const endNum = Number(
            modifiedEndTime?.slice(0, 2) + modifiedEndTime?.slice(3, 5)
        );
        if (startNum >= endNum) {
            return false;
        } else if (startNum < endNum) {
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
            const today = new Date();
            const limitDay = today.getTime() + 7 * 24 * 60 * 60 * 1000;
            const wantedDay = new Date(date).getTime();
            if (compareTest) {
                if (wantedDay >= limitDay) {
                    setErrorMessage("예약가능 날짜가 아닙니다.");
                    setDate(null);
                    return true;
                } else {
                    return false;
                }
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
            method: "PUT",
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
                    handleClose();
                    router.push("/timeTable");
                } else if (data.statusCode === "201") {
                    setErrorMessage(data.message);
                } else if (data.statusCode === "500") {
                    setErrorMessage(data.message);
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
    const handleTestPassword = (e) => {
        e.preventDefault();
        if (password == props.password) {
            return setEnableUpdate(true);
        }
        return;
    };
    const dateModifier = (d) => {
        return new Date(d.getTime() - d.getTimezoneOffset() * 60000)
            .toISOString()
            .slice(0, 10);
    };

    const timeModifier = (d) => {
        return new Date(d.getTime() - d.getTimezoneOffset() * 60000)
            .toISOString()
            .slice(11, 16);
    };
    const onKeyDown = (e) => {
        e.preventDefault();
    };
    const disableDate = (day) => {
        const today = new Date();
        const limitDay = today.getTime() + 6 * 24 * 60 * 60 * 1000;
        if (day.$d.getTime() >= limitDay) {
            return true;
        } else {
            return false;
        }
    };

    return (
        <div>
            <Dialog open={true} onClose={handleClose}>
                <DialogTitle
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        position: "relative",
                    }}
                >
                    <div>동방예약 변경</div>
                    <div>
                        <Button
                            variant="text"
                            style={{
                                position: "abolute",
                                top: "0px",
                                right: "0px",
                            }}
                            onClick={handleClose}
                        >
                            <h3>x</h3>
                        </Button>
                    </div>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText style={{ marginBottom: "15px" }}>
                        {errorMessage}
                    </DialogContentText>
                    {enableUpdate ? (
                        <div>
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    const consequence = testError();
                                    if (!consequence) {
                                        handleUpdate();
                                    }
                                }}
                            >
                                <LocalizationProvider
                                    dateAdapter={AdapterDayjs}
                                >
                                    <DesktopDatePicker
                                        disablePast
                                        label="날짜를 선택해주세요"
                                        value={date}
                                        onChange={(newValue) => {
                                            const d = newValue.$d;
                                            setDate(dateModifier(d));
                                        }}
                                        renderInput={(params) => (
                                            <TextField
                                                onKeyDown={onKeyDown}
                                                {...params}
                                            />
                                        )}
                                        shouldDisableDate={disableDate}
                                    />
                                    <div
                                        style={{
                                            marginTop: "25px",
                                            marginBottom: "15px",
                                        }}
                                    >
                                        <div style={{ fontSize: "13px" }}>
                                            시작시간을 선택해주세요
                                        </div>
                                        <div style={{ marginBottom: "10px" }}>
                                            <TimePicker
                                                format={format}
                                                use12Hours
                                                getPopupContainer={(
                                                    trigger
                                                ) => {
                                                    return trigger.firstChild;
                                                }}
                                                showNow={false}
                                                minuteStep={30}
                                                value={startTime}
                                                onSelect={(newValue) => {
                                                    const d = newValue.$d;
                                                    setModifiedStartTime(
                                                        timeModifier(d)
                                                    );
                                                    setStartTime(newValue);
                                                }}
                                                placement="topLeft"
                                            />
                                        </div>
                                        <div style={{ marginBottom: "10px" }}>
                                            <div style={{ fontSize: "13px" }}>
                                                종료시간을 선택해주세요
                                            </div>
                                            <TimePicker
                                                use12Hours
                                                format={format}
                                                getPopupContainer={(
                                                    triggerNode
                                                ) => {
                                                    return triggerNode.firstChild;
                                                }}
                                                showNow={false}
                                                minuteStep={30}
                                                value={endTime}
                                                onSelect={(newValue) => {
                                                    const d = newValue.$d;
                                                    setModifiedEndTime(
                                                        timeModifier(d)
                                                    );
                                                    setEndTime(newValue);
                                                }}
                                                placement="topLeft"
                                            />
                                        </div>
                                    </div>
                                </LocalizationProvider>
                                <Input
                                    type="text"
                                    placeholder="이름"
                                    value={name}
                                    onChange={({ target }) =>
                                        setName(target.value)
                                    }
                                    style={{
                                        marginBottom: "8px",
                                    }}
                                    required
                                />
                                <Input
                                    type="text"
                                    placeholder="용무"
                                    value={detail}
                                    onChange={({ target }) =>
                                        setDetail(target.value)
                                    }
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
                        </div>
                    ) : (
                        <div>
                            <form onSubmit={handleTestPassword}>
                                <Input
                                    type="text"
                                    placeholder="비밀번호를 입력해주세요"
                                    value={password}
                                    onChange={({ target }) =>
                                        setPassword(target.value)
                                    }
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
                                        확인
                                    </Button>
                                </div>
                            </form>
                        </div>
                    )}
                    {enableUpdate ? (
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
                                    marginBottom: "57px",
                                }}
                                onClick={() => {
                                    handleDelete();
                                    handleClose();
                                }}
                            >
                                삭제
                            </Button>
                        </div>
                    ) : (
                        <div></div>
                    )}
                </DialogContent>
                <DialogActions></DialogActions>
            </Dialog>
        </div>
    );
}
